import {combineReducers} from 'redux'
import hmdata from './hmdata'
import status from './status'

const mergeReducer = combineReducers({
    hmdata, status
})

export default mergeReducer;
