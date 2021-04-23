import React from 'react'

const App = () => {
  const course =  {
    id: 1,
    name: 'Half Stack application development',
    parts: [ {
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      name: 'Using props to pass data',
      exercises: 7
    }, {
      name: 'States of a component',
      exercises: 14
    // }, {
    //   name: 'Redux',
    //   exercises: 11
    } ] 
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )  
}

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

const Header = (props) => (
      <h1>
        {props.course}
      </h1>
)

const Total = ({parts}) => {
  const reducer = (accul, curr) => accul + curr

  const total = parts.map(
    part => part.exercises
  ).reduce(reducer)

  console.log(total)
  return (
    <p>
    total of {total} exercises
    </p>
  )
}

const Part = (props) => (
    <p>
      {props.part}: {props.exercise}
    </p>
)

export default App