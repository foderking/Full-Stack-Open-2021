import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))
  const temp = Object.values(votes)
  const Highest = Math.max.apply(null, temp)
  const indHigh = temp.indexOf(Highest)

  const next = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const increaseVotes = () => {
    let newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}.</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => increaseVotes()}>
        vote
      </button>
      <button onClick={next}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indHigh]}</p>
      <p>has {Highest} votes</p>
    </div>
    )
}

export default App;