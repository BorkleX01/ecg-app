import React, { Component } from 'react'

export default class DataField extends Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      edited: false,
      fieldData: this.props.fieldData
    }

    this.editField = (e) => {
      this.setState({
        edited: true,
        fieldData: e.target.value
      })

      this.props.updateField(
        this.props.fieldName,
        this.state.fieldData
      )
    }
  }
  
  
  render() {
    if(this.props.edit) {
      return <div className={"data-field "  + this.props.fieldName}>
               <div className="field-name">{this.props.fieldName}: </div>
               <input className="field-data" 
                      type="text" value={this.state.fieldData} 
                      onChange={this.editField}
                      onClick={this.expandInput}>
               </input>
             </div>
    }
    else
    {
      return (
        <div className={this.props.className}>
          {this.props.className === "data-field" ?
           <div className="field-name">
             {this.props.fieldName}</div> : null}    
          {this.state.edited ?
           this.state.fieldData : this.props.fieldData}
        </div>)
    }
  }

  
  
}
