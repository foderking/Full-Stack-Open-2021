import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'



const AnecdoteList = () =>
{
	const dispatch = useDispatch()

  const anecdotes = useSelector(
    state =>
      state.anecdote
        .filter(each =>
					each.content.startsWith(state.filter)
				)
    	  .sort( (a, b) => {
          if (a.votes > b.votes) return -1;
          if (a.votes < b.votes) return 1;
          return 0
        })
  )

  const vote = (data) => {
    dispatch(addVote(data))
    dispatch(notify(`You voted: "${data.content}"`, 4))
  }

	return (
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
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				)
			}

		</div>
	)
}

export default AnecdoteList