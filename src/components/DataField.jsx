import React, { Component } from 'react'

export default class DataField extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {
            edited:false,
            fieldData: this.props.fieldData
        }

        this.editField = (e) =>
            ( (this.setState({edited: true ,fieldData: e.target.value})),
              (this.props.editField(this.props.fieldName, this.state.fieldData)))
    } 
    render () {
        return (
            <div className="data-field">
              <div className="field-name">{this.props.fieldName}: </div>
              {this.props.edit ?
                  <input className="field-data" value={this.state.fieldData} onChange={this.editField}></input>
                      :
                  <div className="field-data">{this.state.edited ? this.state.fieldData :this.props.fieldData}</div>}
            </div>
        )
    }
}
