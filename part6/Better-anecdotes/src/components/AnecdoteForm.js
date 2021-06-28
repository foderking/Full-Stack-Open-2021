import React from 'react'
import { addNotes } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) =>
{
	const addNote = async (event) => {
		event.preventDefault()

		const content = event.target.note.value
		event.target.note.value = ''
		
		props.addNotes(content)
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


const mapStatetoProps = (state) => 
	({state: state})

const mapDispatchToProps = {
  addNotes
}


const Connected = connect(mapStatetoProps, mapDispatchToProps)(AnecdoteForm)
export default Connected