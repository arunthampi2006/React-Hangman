import React, { Component } from 'react'

class Linesvg extends Component {
    render() {
        const {svg, strock, x1, y1, x2, y2} = this.props.style
        return(
            <svg style={svg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                    style={strock}/>
            </svg>
        )
    }
}

export default Linesvg