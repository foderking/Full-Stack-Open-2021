import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(
    state => state.sort( (a, b) => {
      if (a.votes > b.votes) return -1;
      if (a.votes < b.votes) return 1;
      return 0
    })
  )
  const dispatch = useDispatch()

  const addVote = id => {

    const note = anecdotes.find(each => each.id === id)
    return {
      type:'VOTE' ,
      data:{
      ...note, votes: note.votes+1
      }
    }
  }
  const vote = (id) => {
    // console.log('vote', id)
    dispatch(addVote(id))
  }

  const addNote = event => {
    event.preventDefault()

    const content = event.target.note.value
    // console.log(content)
    dispatch({
      type:'NEW_NOTE',
      data: content
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='note' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App