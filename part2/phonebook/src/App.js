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
  const stateData = [['Name', newName, setNewName], ['Number', no, setNo]]

  const search = (value) => {
    return value.name.toLowerCase().startsWith(filter.toLowerCase())
  }
  const submitNew = (event) => {
    event.preventDefault()
    const newPers = {name: newName,
                     number: no }
    if (persons.filter(each => each.name === newName).length) {
        window.alert(`${newName} is already added to Phonebook`)
    } else {
        setPersons(persons.concat(newPers))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} search={setFilter} />
      <h2>Add a new</h2>    
      <AddPerson data={stateData} submit={submitNew} />
      <h2>Numbers</h2>
      <ShowPersons data={persons} search={search} />
    </div>
  )
}

const Filter = (props) => 
  <div>
    Filter shown with <input 
      value={props.value} 
      onChange={
        (event) => props.search(event.target.value)
      }
  />
  </div>  


const AddPerson = ({data, submit}) => 
  <div>
    <form onSubmit={submit}>
      {data.map(
        each => <Input key={each[0]} text={each[0]} value={each[1]} handler={each[2]} />
      )}
      <button type="submit" >add</button>
    </form>  
  </div>

const Input = (props) => 
  <div>
    {props.text}: <input 
      value={props.value} 
      onChange={
        (event) => props.handler(event.target.value)
      } 
    />
  </div>


const ShowPersons = ({data, search}) => {
  const filteredList = data.filter(each => search(each))
  return (
    <div>
    {
      filteredList.map(
        each => <EachPerson key={each.name} name={each.name} number={each.number} />
      )
    }
    </div>    
  )
}

const EachPerson = ({name, number}) => <p>{name} {number}</p>


export default App