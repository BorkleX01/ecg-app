import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/App.css'
import { connect } from 'react-redux'
import { changePage , filteredData , deFilteredData, turnOnModal } from '../store/actions'

import Overview from '../containers/Overview'
import Detail from '../containers/Detail'
import Viewport from '../components/Viewport'

import Modal from '../components/Modal'

export class App extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {
            searchStr : '',
            scrollInd : 0
        }
        this.searchBox = (e) =>
            {
                this.setState({searchStr : e.target.value})
                
                e.target.value > this.state.searchStr
                    ?
                    this.props.filteredData(e.target.value)
                    :
                    this.props.deFilteredData(e.target.value)

            }
        this.killModal = (e) => {
            this.props.turnOnModal(false)
        }

        this.setScrollHeight = (h) => {
            console.log(h)
            this.setState({scrollHeight: h})
        }
        this.pager = (e) => {
            let dir = e.currentTarget.id
            console.log(dir)
            this.setState({scrollInd : dir==='scrollL' ? -1 : 1})
        }
    }
    componentDidMount(){
        
    }
    componentDidUpdate(){
        if(this.state.scrollInd !== 0){
            this.setState({scrollInd : 0})
        }
        
    }
    render () {
        const genCrumbs = this.props.nav.map((o) => <span>  :: {o} :: </span>)
        return (
            <div className="App">
              <Modal display={this.props.display}
                     plotXY={this.props.graphPlot}
                     killModal={this.killModal}/>
              <div className="App-header">
                
                <div className="App-title">ECG-APP</div>
                <div className="Page-title">{this.props.view}</div>
                <input className="searchBox" value={this.state.searchStr}
                       onChange={this.searchBox}>
                 </input>
                <div className="breadCrumbs" path={['Overview']}>
                  {genCrumbs}
                </div>
              </div>

              <Viewport setScrollHeight={this.setScrollHeight}
                        scrollElem={this.state.scrollInd}>

                {this.props.view === 'Detail' || this.props.view === 'Edit' ?
                    <Detail obj={this.props.thisDoc}/> :
                        
                        this.props.view === 'Overview' ?
                        <Overview data={this.props.entities}/> :
                        <div>Waiting...</div> }
              </Viewport>


              <div className="App-footer">
                <div className="paginator">

                  <div onClick={this.pager}
                       id="scrollL" className="left">&lt;</div>

                  <div onClick={this.pager}
                       id="scroll" className="right">&gt;</div>
                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({entities, masked, page, nav, thisDoc, modal}) => {
    return  { 
        entities: entities,
        filtered: masked,
        view : page ,
        nav : nav,
        thisDoc: thisDoc,
        display: modal.display,
        graphPlot: modal.plotXY
        }
     }


export default connect(mapStateToProps, {filteredData, deFilteredData, turnOnModal})(App)

