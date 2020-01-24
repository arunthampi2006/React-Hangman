import React, {Component} from 'react'
import {map} from 'lodash'
import {connect} from 'react-redux'

import './sw.css'

class SolvedWords extends Component {
    
    render() {
        const {hmdata, status} = this.props
        const {solvedWords} = hmdata
        return(
            solvedWords.length ?
            <div>
                <h3>Solved Woprds</h3>
                <div>
                    {
                        map(solvedWords, wltr => {
                            return (<span key={wltr} className="swrd txt">{wltr}</span>)
                        })
                    }
                </div>
            </div> : ''
        )
    }
}

const swStateProp = state => state
export default connect(swStateProp)(SolvedWords)