import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeView } from '../appState/view'
import { setCurrentDoc, alterCache } from '../appState/edit'
import { toggleModal } from '../appState/modal'
import { genPlot } from './graphPlot'

import DataField from '../components/DataField'


export class Detail extends Component {
  constructor(props){
    super()
    this.props = props
    this.state = {
      do: false,
      changeView : 'Overview',
      editDocument : false,
      alterCache : {}
    }
    

    if (this.props.thisDoc)
    {
      this.newVals = {
        index: this.props.thisDoc.index,
        indexMasked: this.props.thisDoc.maskInd
      }
      
      this.updateField = (f, d) => {
        this.newVals[f] = d
        this.setState({ alterCache: {...this.newVals} })
      }

      this.btnEditView = (e) => {
        this.setState({do:e.target.id})
      }

      this.linePlot = genPlot(this.props.thisDoc.plot)

      this.imgClick = (e) => {
        var nodeObj = e.currentTarget
        this.props.toggleModal(this.linePlot)
      }
    }
    
    

  } 
  
  componentDidUpdate(){
    const arg = this.state[this.state.do] 
    const action = this.state.do

      if(action){
        if (action === 'editDocument') {
          this.setState({
            editDocument : !this.state.editDocument
          })
          
          if (this.state.editDocument)
          {
            this.props.changeView('Detail')
          }
          else
          {
            this.props.changeView('Edit')

          }
          this.setState({do: false})
        }
        else if (action === 'alterCache')
        {
          this.props[action](arg)
          this.setState({editDocument : false, do: false})
        }
        else
        {
          this.props[action](arg)
        }
      }
  }
  
  render () {
    if (this.props.thisDoc){
    const obj = this.props.thisDoc
    return (
      <div className="document-form">
        
        <div className="editor-group">
          <button onClick={this.btnEditView}
                  id='editDocument'>Toggle Edit</button>
          <button onClick={this.btnEditView}
                  id='alterCache'>Submit</button>
          <button onClick={this.btnEditView}
                  id='changeView'>Close</button>
        </div>
        
        <div className="data-content">
          <div onClick={this.imgClick} className="graph-embedded">
            <svg x="0" y="0" width="1000" height="200"
                 viewBox="0 -50 1000 50"
                 version="1.1" xmlns="http://www.w3.org/2000/svg">
              {this.linePlot?
               <path d={this.linePlot}
                     fill="transparent"
                     stroke = "grey"/>:null}
            </svg>
          </div>
          
          
          <div className = "text-fields"> 
            {Object.keys(obj).map(
              (o,i,arr) =>
                <DataField key={i}
                           updateField = {this.updateField}
                           edit={this.state.editDocument}
                           fieldName={o}
                           fieldData={obj[o]}
                           className={'data-field'}>
                </DataField>
            )}
          </div>
        </div>
      </div>
    )}
    else{
      return <div>Waiting...</div>
    }
  }
}

const getState = (state) => {
  return {
    thisDoc: state.thisDoc,
    view: state.view
  }
}


const setState = {
  changeView,
  alterCache,
  toggleModal
}

export default connect(getState, setState)(Detail)

