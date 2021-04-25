import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const setInput = (event) => {
    setNewName(event.target.value)
  }
  const submitNew = (event) => {
    event.preventDefault()
    const newPers = {name: newName}

    if (persons.filter(each => each.name === newName).length) {
        window.alert(`${newName} is already added to Phonebook`)
    } else {
        setPersons(persons.concat(newPers))
      }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNew}>
        <div>
          name: <input value={newName} onChange={setInput}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(
          each => <p key={each.name}>{each.name}</p>
          )}
    </div>
  )
}


export default App