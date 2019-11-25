import React, { Component } from 'react'
import '../styles/App.css'
import { connect } from 'react-redux'
import { applyFilter } from '../appState/search'
import { toggleModal } from '../appState/modal'


import Overview from '../containers/Overview'
import Detail from '../containers/Detail'
import Viewport from '../components/Viewport'
import Modal from '../components/Modal'

export class App extends Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      searchStr: '',
      scrollInd: 0,
      entities: this.props.entities
    }
    
    this.props.applyFilter(['', this.props.entities])
    this.searchBox = (e) => {
      this.props.applyFilter([e.target.value, this.props.entities])
      this.setState({searchStr: e.target.value})

    }
    this.killModal = (e) => {
      this.props.toggleModal(false)
    }

    this.setScrollHeight = (h) => {
      this.setState({ scrollHeight: h })
    }

    this.pager = (e) => {
      let dir = e.currentTarget.id
      this.setState({ scrollInd: dir === 'scrollL' ? -1 : 1 })
    }
  }
  
  componentDidUpdate() {
    if (this.state.scrollInd !== 0) {
      this.setState({ scrollInd: 0 })
    }
    console.log(this.props.nav)
  }   

  render() {
    return (
      <div className="App">
        <Modal display={this.props.display}
               plotXY={this.props.graphPlot}
               killModal={this.killModal}/>
        <div className="App-header">

          <div className="App-title">ECG-APP</div>
          <div className="Page-title">{this.props.view}</div>
          
          <input type="search" className="searchBox" value={this.state.searchStr}
                 onChange={this.searchBox}>
            
          </input>
          
          <div className="breadCrumbs">
            
            {this.props.nav ? this.props.nav.map((o) => <span>  :: {o} :: </span>) : null}
          </div>

        </div>

        <Viewport setScrollHeight={this.setScrollHeight}
                  scrollElem={this.state.scrollInd}>
          {this.props.view
           ?
           this.props.view === 'Detail' || this.props.view === 'Edit'
           ?
           <Detail mode={this.props.view}/>
           :
           this.props.view === 'Overview'
           ?
           <Overview data={this.state.entities} />
           :
           <Overview data={this.state.entities} />
           :
           null}
        </Viewport>


        <div className="App-footer">
          <div className="paginator">

            <div onClick={this.pager}
                 id="scrollL" className="left">&lt;</div>

            <div onClick={this.pager}
                 id="scrollR" className="right">&gt;</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ entities, entitiesF, view,  thisDoc, modal, nav }) => {
    return {
      entities: entities,
      filtered: entitiesF,
      view: view,
      nav: nav,
      thisDoc: thisDoc,
      display: modal.display,
      graphPlot: modal.plotXY
      
    }
}


export default connect(mapStateToProps, { applyFilter, toggleModal })(App)

