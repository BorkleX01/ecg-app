import React, { Component } from 'react'
import { connect } from 'react-redux'
import {editMode, changePage, alterCache, turnOnModal } from '../store/actions'
import DataField from '../components/DataField'


export class Detail extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {
            do: false,
            changePage : 'Overview',
            editDocument : false,
            alterCache : {}
        }

        this.newObj = {index:this.props.thisDoc.index}
    
        this.newData = (f, d) => {
            this.newObj[f] = d
            this.setState({alterCache: {...this.newObj}})
        }

        this.btnEditView = (e) => {
            this.setState({do:e.target.id})
        }

        
        let graphCoords = "M0 ";
        let signal = this.props.thisDoc.plot;

        
        for (var i = 0; i < signal.length; i++) {
            graphCoords =
                graphCoords + signal[i] + '  L ' + Number(10+i*10) + ' '
        }

        this.linePlot = graphCoords

        this.imgClick = (e) => {
            var nodeObj = e.currentTarget
            this.props.turnOnModal(this.linePlot)
        }

    }
    
    componentDidUpdate(){
        
        const arg = this.state[this.state.do] 
        const action = this.state.do
        if(action){
            if (action === 'editDocument') {
                this.setState({
                    editDocument : !this.state.editDocument })
                if (this.state.editDocument)
                {this.props.changePage('Detail')}
                else {
                    this.props.changePage('Edit')

                }
                this.setState({do: false})
            } else {
                this.props[action](arg)
            }
        }
    }
    
    render () {
        const obj = this.props.thisDoc
        const modalVis =
                  this.props.modalVis ? 'inline' : 'none'
        return (
            <div className="document-form">
              <div className="editor-group">
                <button onClick={this.btnEditView}
                        id='editDocument'>Toggle Edit</button>
                <button onClick={this.btnEditView}
                        id='alterCache'>Submit</button>
                <button onClick={this.btnEditView}
                        id='changePage'>Close</button>
              </div>
              <div className="data-content">
                <div onClick={this.imgClick} className="ecg">
                  <svg x="0" y="0" width="1000" height="200"
                       viewBox="0 -50 1000 50"
                       version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d={this.linePlot}
                          fill="transparent"
                          stroke = "black"/>
                  </svg>
                </div>

                {Object.keys(obj).map(
                    (o,i,arr) =>
                        <DataField key={i} editField={this.newData} edit={this.state.editDocument} fieldName={o} fieldData={obj[o]}></DataField>
                )}
            </div>
                </div>
        )
    }
}

const mapStateToProps = ({thisDoc, modal}) => {
    return {
        thisDoc : thisDoc,
    }
}

export default connect(mapStateToProps, {editMode, changePage, alterCache, turnOnModal})(Detail)

