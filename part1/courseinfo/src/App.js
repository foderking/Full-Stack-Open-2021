import React from 'react'

const Header = (props) => (
      <h1>
        {props.course}
      </h1>
)

const Total = (props) => (
    <p>
    Number of exercises: {props.ex1 + props.ex2 + props.ex3}
    </p>
)

const Part = (props) => (
    <p>
      {props.part}: {props.exercise}
    </p>
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
  const part1 = {
    name: 'Fundementals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'States of a component',
    exercises: 14
  }    

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} 
        part2={part2.name} 
        part3={part3.name} 
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises} 
      />
      <Total 
        ex1={part1.exercises} 
        ex2={part2.exercises} 
        ex3={part3.exercises} 
      />
    </div>
  )
}

export default App