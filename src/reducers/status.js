import {extend, cloneDeep} from 'lodash'

const initialState = {
    isInputTxt: false,
    isSolved: false,
    isHMavailable: false,
    isSkipped: false
}

const statusdispatch = (value) => cloneDeep(value).statusdispatch
export default function status(state = cloneDeep(initialState), action) {
    switch(action.type) {
        case 'LEVEL_CHANGE': 
            return extend({}, state, statusdispatch(action.value))
        case 'VALIDATE_TEXT': 
            return extend({}, state, statusdispatch(action.value))
        case 'WORD_GENERATE': 
            return extend({}, state, statusdispatch(action.value))
        default:
            return state
    }
}