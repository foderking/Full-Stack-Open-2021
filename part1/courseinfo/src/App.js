import React from 'react'

const Header = (props) => (
      <h1>
        {props.course}
      </h1>
)

const Total = (props) => {
  let total = 0

  props.parts.forEach( value => {
    total += value.exercises
  } )
  return (
    <p>
    Number of exercises: {total}
    </p>
  )
}

const Part = (props) => (
    <p>
      {props.part}: {props.exercise}
    </p>
)

const Content = (props) => {
  const element = props.parts.map( value => <Part 
    part={value.name} 
    exercise={value.exercises} 
    key={props.parts.indexOf(value)}
  />)

  return (
    <div>
      {element}
    </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [ {
    name: 'Fundementals of React',
    exercises: 10
  }, {
    name: 'Using props to pass data',
    exercises: 7
  }, {
    name: 'States of a component',
    exercises: 14
  } ]   

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App