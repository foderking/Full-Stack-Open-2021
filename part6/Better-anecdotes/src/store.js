import React from 'react'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './reducers/anecdoteReducer'
import notReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'


const reducer = combineReducers({
	notification: notReducer,
	anecdote: anecReducer
})

const store = createStore(
	reducer,
	composeWithDevTools()
)
console.log(store.getState())

export default store