import React from 'react'

const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
)

const Total = (props) => (
  <div>
    <p>
    Number of exercises: {
      props.exercises1 + props.exercises2 + props.exercises3
    }
    </p>
  </div>
)

const Content = (props) => (
  <div>
    <p>{props.part1}: {props.exercises1}</p>
    <p>{props.part2}: {props.exercises2}</p>
    <p>{props.part3}: {props.exercises3}</p>
  </div>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    '', 
    'Fundementals of React', 
    'Using props to pass data', 
    'States of a component'
    ]
  const exercises = [NaN, 10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={parts[1]} 
        part2={parts[2]} 
        part3={parts[3]} 
        exercises1={exercises[1]} 
        exercises2={exercises[2]} 
        exercises3={exercises[3]} 
      />
      <Total 
        exercises1={exercises[1]} 
        exercises2={exercises[2]} 
        exercises3={exercises[3]} 
      />
    </div>
  )
}

export default App