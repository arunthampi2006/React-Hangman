import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'

import './gd.css'

class GameDetails extends Component {
    render() {
        const {hmdata} = this.props
        const {gameDetails} = hmdata
        return (
            !isEmpty(gameDetails) ? 
            <div className="game-details">
                <h4>Game Details</h4>
                <div className="total">Total Played: <strong>{gameDetails.total}</strong></div>
                <div className="solved-container">
                    <div className="solved">Solved: <strong>{gameDetails.solved}</strong></div>
                    <div className="easy">Easy: <strong>{gameDetails.easy}</strong></div>
                    <div className="medium">Medium: <strong>{gameDetails.medium}</strong></div>
                    <div className="hard">Hard: <strong>{gameDetails.hard}</strong></div>
                </div>
                <div className="lost">Lost: <strong>{gameDetails.lost}</strong></div>
                <div className="skipped">Skipped: <strong>{gameDetails.skipped}</strong></div>
            </div> : ''
        )
    }
}

const gdStateProp = state => state

export default connect(gdStateProp)(GameDetails)