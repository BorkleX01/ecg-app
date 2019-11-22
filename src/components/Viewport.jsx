import React, { Component } from 'react'
import ReactDOM from  'react-dom'

export default class Viewport extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {}
        this.vPortRef = React.createRef()
    }

    componentDidUpdate(){
        let dir = this.props.scrollElem
        this.scrollHeight = this.vPortRef.current.getClientRects()[0].height
        if(dir !== 0) {this.vPortRef.current.scrollBy({
            top:this.scrollHeight*dir,
            left:0,
            behavior:'smooth'})}
    }
    
    render () {
        return (
            <div ref={this.vPortRef}
                 className="App-viewport" >
              {this.props.children}
            </div>

        )
    }
}
