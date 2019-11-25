import React, { Component } from 'react'
import ReactDOM from  'react-dom'
import { connect } from 'react-redux'
import DataRow from '../components/DataRow'
export  class Overview extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {}
        
        this.oViewRef = React.createRef()

        this.dRef = {}
        this.dRefMaker = (ind) => this.dRef[ind] = React.createRef()

        this.rowRef = {}
        this.rowRefMker = (ind) => this.rowRef[ind] = React.createRef() 
    }
    
  
  render () {
    return (
      <table ref={this.oViewRef}
             className="data-table">
        {this.props.data.map((obj,i,arr) =>
                             <DataRow key={i}
                                      maskIndex={i}
                                      obj={obj} /> )}
      </table>
    )
    
  }
}

const mapStateToProps = (state) => {
    return {
        data:state.entitiesF
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
