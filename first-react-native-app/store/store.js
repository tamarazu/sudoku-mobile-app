import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import sudokuReducer from './reducers/sudokuReducer'

export default createStore(
    combineReducers({
        sudokuReducer
    }),
    applyMiddleware(thunk)
)