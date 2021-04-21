import React from 'react'

const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
)

const Total = (props) => (
  <div>
    <p>
    Number of exercises: {props.ex1 + props.ex2 + props.ex3}
    </p>
  </div>
)

const Part = (props) => (
  <>
    <p>{props.part}: {props.exercise}</p>
  </>
)

const Content = (props) => (
  <div>
    <Part 
      part={props.part1} 
      exercise={props.exercises1} 
    />
    <Part 
      part={props.part2} 
      exercise={props.exercises2}
    />
    <Part 
      part={props.part3} 
      exercise={props.exercises3} 
    />
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
        ex1={exercises[1]} 
        ex2={exercises[2]} 
        ex3={exercises[3]} 
      />
    </div>
  )
}

export default App