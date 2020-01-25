 import React, { Component } from 'react'
 import Dropdown from 'react-dropdown'
 import 'react-dropdown/style.css'
 import {range, map, random, forEach} from 'lodash'
 import randomWords from 'random-words'
 import './styles/app.css'
 import {levelChange, wordGenerate} from './actions'
 import {connect} from 'react-redux'

 import Hmchances from './components/Hmchances'
 import Finaloutput from './components/Finalouput'
 import InputBox from './components/InputBox'
 import Wrongletters from './components/WrongLetters'
 import GameDetails from './components/GameDetails'

class APP extends Component {
    componentWillMount() {
        this.setState({
            ddItems: this.getDDlist(),
            hmSelected: {
                label: 'Easy',
                value: 1,
                correctWrd: false
            }
        })
    }
    getDDlist() {
        let ddRange = range(1,4)
        return map(ddRange, dd => {
            let obj = {}
            obj.label = dd === 1 ? 'Easy' : dd === 2 ? 'Medium' : 'Hard';
            obj.value = dd
            return obj
        })
    }
    rwGenerate(slvl) {
        const {store} = this.props
        const {hmdata, status} = store.getState()
        const {gameDetails} = hmdata
        const {isSkipped} = status
        let randomWord = this.generateRandomWords(slvl)
        let generateWord = randomWord.split(' ')
        let letters = []
        let editedWords = map(generateWord, (sw, i) => {
            let rndm = random(0, sw.length - 1)
            let txt = sw[rndm]
            let upSW = map(sw, s => s !== txt ? '' : s)

            i >= 1 ? upSW.unshift(false) : upSW
            letters = [...letters, ...upSW]
            return upSW
        })
        let total = gameDetails.total
        total = total ? total + 1 : 1
        gameDetails.total = total

        let skipped = gameDetails.skipped
        skipped = skipped ? skipped : 0
        skipped = isSkipped ? skipped + 1 : skipped
        gameDetails.skipped = skipped

        this.setState({ correctWrd: false })
        let statusdispatch = {isSolved: false, isHMavailable: true, isSkipped: true}
        let hmdispatch = {generateWord, letters, randomWord, editedWords, gameDetails}
        store.dispatch(wordGenerate({hmdispatch, statusdispatch}))
    }
    selectLvlChange(hmSelected) {
        const {store} = this.props
        this.setState({ hmSelected, correctWrd: false })
        let statusdispatch = {isSolved: false, isHMavailable: false}
        let hmdispatch = {chances: 7}
        store.dispatch(levelChange({statusdispatch, hmdispatch}))
    }
    generateRandomWords(slvl) {
        let {hmSelected} = this.state;
        let lvl = slvl ? slvl: hmSelected.value
        let param = {min: 3, max: 10}
        lvl !== 1 ? param.wordsPerString = lvl : param.maxLength = 8;
        let rndmWrds = randomWords(param)
        let rwRange = range(0, rndmWrds.length)
        return rndmWrds[random(rwRange, lvl)].toLocaleUpperCase()
    }
    handleClick() {
        let { hmSelected } = this.state
        this.rwGenerate(hmSelected.value)
    }
    correctWord() {
        this.setState({ correctWrd: true })
    }
    render() {
        const {ddItems, hmSelected, correctWrd} = this.state;
        const {store} = this.props
        const {hmdata, status} = store.getState()
        const {randomWord, chances} = hmdata
        const {isSolved} = status
        return (
            <div>
                <h2>Hangman Game</h2>
                <Finaloutput hmdata={hmdata} {...this.props}/>
                {correctWrd && !chances ?
                    <h4 className="corct-word">{randomWord}</h4> : ''
                }
                <div className="generate-container">
                    <Dropdown
                        options={ddItems}
                        placeholder="Select a Level" 
                        className='hm-dd'
                        onChange={this.selectLvlChange.bind(this)}
                        value={hmSelected}
                    />
                    <button
                        className="generate-btn"
                        onClick= {this.handleClick.bind(this)}
                    >
                        Generate
                    </button>
                </div>
                 {
                     isSolved ? <h4 className="win">Congratulation! You won the game </h4>: ''
                 }
                 {
                     !chances ? <h4 className="lost">You lost the game </h4>: ''
                 }
                <Hmchances {...this.props}/>
                <GameDetails hmdata={hmdata} status={status} {...this.props}/>
                <InputBox {...this.props}/>
                <div>
                    { !chances ? 
                        <button className="solve" onClick={this.correctWord.bind(this)}>Correct Word</button> : ''
                    }
                </div>
                <Wrongletters hmdata={hmdata} status={status} {...this.props}/> 
            </div>
        )
    }
}

const appStatusProps = state => state

export default connect(appStatusProps)(APP)