import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {  initializeNotes } from './reducers/anecdoteReducer'
// import anecService from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import store from './store'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeNotes())
	}, [dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App