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
           
              
              <tr className="data-row">
                <td className="row-tip">
                  <button className="show-detail-btn" 
                  onClick={this.showDocument}> Open </button>
                </td>
               
                {Object.keys(obj).map((o,i,arr)=> (i > 2 ? 
                  <DataField key={i} fieldName={o} fieldData={obj[o]} className={'field-data-cell'} />:null) )}
                
              </tr>
            
        )
    }
}

const mapStateToProps = ({thisDoc}) => {
    return {
        thisDoc : thisDoc
    }
}


export default connect(mapStateToProps, {changePage, setCurrentDoc})(DataRow)
