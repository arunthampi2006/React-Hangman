import React, { Component } from 'react'
import {map, flatten, forEach} from 'lodash'
import './inptBox.css'

import {validateText} from '../../actions'
import {connect} from 'react-redux'

class InputBox extends Component {
    componentWillMount() {
        this.setState({
            val: '',
            isDisabled: true
        })
    }
    inputChange(e) {
        let val = e.target.value
        const pattern = /^[a-zA-Z]{1,1}$/
        const valChk = val !== '' && !pattern.test(val)
        let stVal = valChk ? '' : val
        this.setState({val: stVal, isDisabled: valChk})

    }
    _isValidateLetter() {
        const {store} = this.props
        const {hmdata, status} = store.getState()
        const {editedWords, randomWord, generateWord, wrongLetters, solvedWords, hmChanceList, chances} = hmdata
        let {gameDetails} = hmdata
        let {isSolved, isSkipped} = status
        let {val} = this.state
        val = val.toLocaleUpperCase()
        let ch = chances
        if (val !== '' && chances) {
            let wrngLtr = ''
            let pikLtr = ''
            forEach(generateWord, (gnrW, i) => {
                forEach(gnrW, (gw, g) => {
                    if(gw === val) {
                        let gi = i >= 1 ? g + 1 : g
                        editedWords[i][gi] = val
                        pikLtr = val
                        wrngLtr = ''
                    } else {
                        wrngLtr = pikLtr !== '' ? '' : val
                    }
                })
            })
            if (wrngLtr !== '') {
                wrongLetters.push(wrngLtr)
                ch -= 1
                hmChanceList.push((7-ch))
                wrngLtr = ''
                pikLtr = ''
            }
            let letters = flatten(editedWords)
            let gdObj = {}
            let spltWords = randomWord.split(' ')
            let ltr = map(letters, lt => lt ? lt : ' ')
            let solved = gameDetails.solved
                solved = solved ? solved : 0
            let easy = gameDetails.easy
                easy = easy ? easy : 0
            let medium = gameDetails.medium
                medium = medium ? medium : 0
            let hard = gameDetails.hard
                hard = hard ? hard : 0
            if (randomWord.localeCompare(ltr.join('')) === 0) {
                solvedWords.push(randomWord)
                let swLngth = spltWords.length
                solved = solved ? solved + 1 : 1
                easy = swLngth === 1 ? easy + 1 : easy
                medium = swLngth === 2 ? medium + 1 : medium
                hard = swLngth === 3 ? hard + 1 : hard

                isSolved = true
                isSkipped = false
            }

            let lost = gameDetails.lost
            lost = lost ? lost : 0
            lost = !ch ? lost + 1 : lost
            gdObj = {solved, easy, medium, hard, lost}

            gameDetails = {...gameDetails, ...gdObj}

            isSkipped = !ch && !isSolved ? false : isSkipped

            let statusdispatch = {isSolved, isSkipped}
            let hmdispatch = {letters, wrongLetters, solvedWords, hmChanceList, chances: ch, gameDetails}
            store.dispatch(validateText({hmdispatch, statusdispatch}))
            this.setState({val: '', isDisabled: true})
        }
    }
    render() {
        let {val, isDisabled} = this.state
        const {store} = this.props
        const {status} = store.getState()
        const {isSolved, isHMavailable} = status
        let divCls = !isHMavailable ? 'elem-hide' : ''
        divCls += ' inpt-container'
        return(
            <div className={divCls}>
                <input
                    className="inpt-box"
                    maxLength="1"
                    value={val}
                    onChange={this.inputChange.bind(this)}
                    disabled={isSolved}
                />
                <button
                    onClick={this._isValidateLetter.bind(this)}
                    disabled={isDisabled}
                    className='validate'
                >
                    Validate Letter
                </button>
            </div>
        )
    }
}

const ibStatusProps = state => state

export default connect(ibStatusProps)(InputBox)