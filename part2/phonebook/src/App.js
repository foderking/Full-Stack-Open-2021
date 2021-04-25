import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [no, setNo] = useState('')
  const [filter, setFilter] = useState('')

  const search = (value) => {
    return value.name.toLowerCase().startsWith(filter.toLowerCase())
  }
  const submitNew = (event) => {
    event.preventDefault()
    const newPers = {name: newName,
                    number: no}

    if (persons.filter(each => each.name === newName).length) {
        window.alert(`${newName} is already added to Phonebook`)
    } else {
        setPersons(persons.concat(newPers))
      }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} /></div>
      <h2>add a new</h2>
      <form onSubmit={submitNew}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
          <br />
          number: <input value={no} onChange={(event) => setNo(event.target.value)}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.filter(
            each => search(each)
          ).map(
          each => <p key={each.name}>{each.name} {each.number}</p>
          )}
    </div>
  )
}


export default App