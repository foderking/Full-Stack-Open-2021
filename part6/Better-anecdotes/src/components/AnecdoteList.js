import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addVote, createNote } from '../reducers/anecdoteReducer'


const AnecdoteList = () =>
{
	const dispatch = useDispatch()

  const anecdotes = useSelector(
    state => state.anecdote.sort( (a, b) => {
      if (a.votes > b.votes) return -1;
      if (a.votes < b.votes) return 1;
      return 0
    })
  )

  const vote = (id) => {
    dispatch(addVote(id, anecdotes))
  }

	return(
		<div>
      <h2>anecdotes</h2>
      {
			anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
			}

		</div>
	)
}

export default AnecdoteList