import {extend, cloneDeep} from 'lodash'

const initialHMdata = {
    randomWord: '',
    generateWord: [],
    letters: [],
    editedWords : [],
    wrongLetters: [],
    solvedWords: [],
    chances: 7,
    hmChanceList: [],
    gameDetails: {}
}
const hmdispatch = (value) => cloneDeep(value).hmdispatch

export default function hmdata(state = cloneDeep(initialHMdata), action) {

    switch(action.type) {
        case 'WORD_GENERATE': 
            let wgObj = cloneDeep(initialHMdata);
            delete wgObj.solvedWords
            // delete wgObj.gameDetails
            let data = extend({}, wgObj, hmdispatch(action.value))
            return extend({}, state, data)
        case 'VALIDATE_TEXT':
            return extend({}, state, hmdispatch(action.value))
        case 'LEVEL_CHANGE':
            return extend({}, state, hmdispatch(action.value))
        default:
            return state
    }
    
}