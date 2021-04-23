import React from 'react'

const Course = ({course}) => {
  const container = course.map(each => <Container key={each.id} course={each} />)
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {container}

    </div>
  )  
}

const Content = ({parts}) => {
  const element = parts.map( value => <Part 
    part={value.name} 
    exercise={value.exercises} 
    key={parts.indexOf(value)}
  />)
  return (
    <div>
      {element}
    </div>
    )
}

const Container = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
    )
}

const Total = ({parts}) => {
  const reducer = (accul, curr) => accul + curr

  const total = parts.map(
    part => part.exercises
  ).reduce(reducer)

  return (
    <strong>
    total of {total} exercises
    </strong>
  )
}
const Header = ({course}) => (
      <h2>
        {course}
      </h2>
)
const Part = (props) => (
    <p>
      {props.part}: {props.exercise}
    </p>
)

export default Course