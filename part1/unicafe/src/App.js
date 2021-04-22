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
      <h2>statistics</h2>
      <State review={review} />
    </div>
    )
}

const Button = ({value, click}) => 
    <button onClick={click}>
      {value}
    </button>

const State = ({review}) => {
  return (
    <div>
      <p>good {review.good}</p>
      <p>neutral {review.neutral}</p>
      <p>bad {review.bad}</p>
    </div>
    )
}
export default App;
