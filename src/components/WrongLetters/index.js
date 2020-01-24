import React, {Component} from 'react'
import {connect} from 'react-redux'
import {map} from 'lodash'
import './wl.css'

class Wrongletters extends Component {
    render() {
        const {hmdata, status} = this.props
        const {wrongLetters} = hmdata
        const {isHMavailable} = status
        return (
            wrongLetters.length && isHMavailable ?
            <div>
                <h3>Wrong Letters</h3>
                {
                    map(wrongLetters, wltr => {
                        return (<span key={wltr} className="wlBox txt">{wltr}</span>)
                    })
                }
            </div> : ''
        )
    }
}

const wlStateProp = state => state
export default connect(wlStateProp)(Wrongletters)