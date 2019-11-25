import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeView } from '../appState/view'
import { setCurrentDoc } from '../appState/edit'
import DataField from './DataField'

class DataRow extends Component {
  constructor(props){
    super()
    this.props = props
    this.state = {}

    this.showDocument = (e) =>
      {
        props.setCurrentDoc({maskInd: props.maskIndex, ...props.obj})
        props.changeView('Detail')
      }
  }
  
  render () {
    const obj = this.props.obj
    return (
      <div className="data-row">
        <div className="row-tip">
          <button className="show-detail-btn" 
                  onClick={this.showDocument}> Open </button>
        </div>
        
        {Object.keys(obj)
         .map((o,i,arr)=>
              (i > 2 ?
               <DataField key={i}
                          fieldName={o}
                          fieldData={obj[o]}
                          className={'field-data-cell'} />
               :null) )}
        
      </div>
      
    )
  }
}

const mapStateToProps = ({thisDoc}) => {
    return {
        thisDoc : thisDoc
    }
}


export default connect(mapStateToProps, {changeView, setCurrentDoc})(DataRow)
