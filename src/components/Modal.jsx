import React, { Component } from 'react'

export default class Modal extends Component {
    constructor(props){
        super()
        this.props = props
        this.state = {
            display: props.display,
            plotXY: props.plotXY          
        }
            
        this.imgClick = (e) => {
            this.props.killModal()
        }
    }

    render () {
        return (
            <div className="graph-modal"
                 onClick={this.imgClick}
                 style={{display: this.props.display}}>
              <svg x="0" y="0" width="1000" height="200"
                   viewBox="0 -50 1000 50"
                   version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d={this.props.plotXY}
                      fill="transparent"
                      stroke="black"/>
                  </svg>
            </div>
        )
    }
}

