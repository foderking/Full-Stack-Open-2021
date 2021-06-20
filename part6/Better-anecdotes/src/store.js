import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducer = combineReducers({
	notification: notReducer,
	anecdote: anecReducer,
	filter: filterReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store