import React, { Component } from 'react'

class Circlesvg extends Component {
    render() {
        const {style} = this.props
        return(
            <svg style={{width: 20+'%',
                height: 16+'%',
                left: 28+'px',
                top: 26+'px'}}>
                <circle cx="22" cy="16" r="14" style={style} fill="transparent" />
            </svg>
        )
    }
}

export default Circlesvg