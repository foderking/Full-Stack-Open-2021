import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addVote, createNote } from '../reducers/anecdoteReducer'
import server from '../services/anecdotes'



const AnecdoteForm = () =>
{
	const dispatch = useDispatch()

	const addNote = async (event) => {
		event.preventDefault()
		const content = event.target.note.value
		event.target.note.value = ''
		
		const data =await  server.post({content,votes:0})//.then(data => {

		console.log(data)	
	
		dispatch(createNote(data))
	}

	return(
		<div>
			<h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='note' /></div>
        <button type='submit'>create</button>
      </form>
		</div>
	)
}

export default AnecdoteForm