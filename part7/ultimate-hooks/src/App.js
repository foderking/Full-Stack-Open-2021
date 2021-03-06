  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => { 
    setValue('')
  }

  return {
    type,
    value,
    reset,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // axios.get(baseUrl).then(data => setResources(data.data))
  useEffect( async() => {
    const rand = await axios.get(baseUrl)
    setResources(rand.data)
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource).then(data => setResources(resources.concat(data.data)))
  }


  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  console.log(notes, noteService)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>

      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>

      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>

      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App