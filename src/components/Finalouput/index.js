import React, { Component } from 'react'
import {map, isBoolean} from 'lodash'
import './fo.css'

import { connect } from 'react-redux'

class Finaloutput extends Component {
    render() {
        const {hmdata, status} = this.props
        const {letters} = hmdata
        const {isHMavailable} = status

        return (
            <div>
                { isHMavailable ?
                    map(letters, (ltr, i) => {
                        return (!isBoolean(ltr) ? 
                        <span key={i} className="foBox txt">{ltr}</span> : 
                        <span key={i} className="foBox"></span>
                        )
                    })
                    : ''
                }
            </div>
        )
    }
}

// export default Finaloutput
const foStateToProp = state => state
  
  export default connect(foStateToProp)(Finaloutput)