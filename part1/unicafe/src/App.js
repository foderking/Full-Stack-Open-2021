import React, { useState } from 'react'


const App = () => {
  const [review, setReview] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const incRev = (value) => {
    const newValue = {...review}
    newValue[value] += 1

    setReview(newValue)
  }  
  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        click={() => incRev('good')} 
        value='good' 
      />
      <Button 
        click={() => incRev('neutral')} 
        value='neutral' 
      />
      <Button 
        click={() => incRev('bad')} 
        value='bad' 
      />
      <State review={review} />
    </div>
    )
}

const Button = ({value, click}) => 
    <button onClick={click}>
      {value}
    </button>

const State = ({review}) => {
  const good = review.good
  const neutral = review.neutral
  const bad = review.bad
  const total = good + neutral + bad
  const positive = good / total * 100
  const average = (good - bad) / total

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
    )
}
export default App;
