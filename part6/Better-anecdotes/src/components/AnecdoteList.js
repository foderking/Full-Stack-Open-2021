import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import store from '../store'

const AnecdoteList = () =>
{
	const dispatch = useDispatch()

  const anecdotes = useSelector(
    state =>
      state.anecdote
        .filter(each => each.content.startsWith(state.filter))
    	  .sort( (a, b) => {
          if (a.votes > b.votes) return -1;
          if (a.votes < b.votes) return 1;
          return 0
        })
  )

  const vote = (id) => {
    notify(id)
    dispatch(addVote(id, anecdotes))
  }

  const notify = (id) => {
    const voted = anecdotes.find(each => each.id === id).content
    dispatch(newNotification(`You voted: "${voted}"`))
    setTimeout(() => dispatch(newNotification('')), 5000)
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