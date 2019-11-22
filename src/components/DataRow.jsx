import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentDoc, changePage } from '../store/actions'
import DataField from './DataField'

class DataRow extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {}

        this.showDocument = (e) =>
            (props.setCurrentDoc(this.props.obj),
             props.changePage('Detail'))
    }
    
    render () {
        const obj = this.props.obj
        return (
            <div>
              
              <div className="data-row">
                <div className="row-tip">
                  <button className="show-detail-btn" onClick={this.showDocument}> Open </button>
                </div>
                {Object.keys(obj).map((o,i,arr)=><DataField key={i} fieldName={o} fieldData={obj[o]}/> )}
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({thisDoc}) => {
    return {
        thisDoc : thisDoc
    }
}


export default connect(mapStateToProps, {changePage, setCurrentDoc})(DataRow)
