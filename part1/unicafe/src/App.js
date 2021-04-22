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
      <h2>give feedback</h2>
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
      <Statistics 
        good={review.good}
        neutral={review.neutral}
        bad={review.bad}
      />
    </div>
    )
}

const Button = ({value, click}) => 
    <button onClick={click}>
      {value}
    </button>

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
      )
  }
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {total}</p>
      <p>average { (props.good - props.bad) / total }</p>
      <p>positive { props.good / total * 100 }%</p>
    </div>
    )
}
export default App;
