import React, { useState, useEffect } from 'react'
import serve from './services/persons'

const App = () => {
  console.log('load...')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [no, setNo] = useState('')
  const [filter, setFilter] = useState('')
  const stateData = [['Name', newName, setNewName], ['Number', no, setNo]]

  useEffect(
    () => {
      serve.getPersons()
        .then(personData => setPersons(personData))
    },
  [])

  const search = (value) => {
    return value.name.toLowerCase().startsWith(filter.toLowerCase())      // finds names in phonebook that start with name stored in the"filter" state
  }
  const buttonSubmit = (id) => {
    console.log(`id: ${id} deleted`)
    serve.deletePerson(id)
      .then(response => {
        serve.getPersons()
          .then(personData => setPersons(personData))        
        // setPersons(response)
      })
  }

  const submitNew = (event) => {
    event.preventDefault()

    const newPers = {
      name: newName,
      number: no 
    }

    if (persons.filter(each => each.name === newName).length) {
        window.alert(`${newName} is already added to Phonebook`)
    } else {
        serve.addPerson(newPers)
          .then(response => {
            console.log(response)
            setPersons(persons.concat(response))

          })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} search={setFilter} />
      <h2>Add a new</h2>    
      <AddPerson data={stateData} submit={submitNew} />
      <h2>Numbers</h2>
      <ShowPersons data={persons} search={search} button={buttonSubmit}/>
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


const ShowPersons = ({data, search, button}) => {
  const filteredList = data.filter(each => search(each))
  return (
    <div>
    {
      filteredList.map(
        each => 
        <EachPerson 
          key={each.id} 
          id = {each.id}
          name={each.name} 
          number={each.number} 
          button={button}
        />
      )
    }
    </div>    
  )
}

const EachPerson = ({name, number, id, button}) => {
  // console.log(this.props)
  return (
    <div>
      {name} {number}
      <button onClick={() => button(id)}>
        delete
      </button>
    </div>
  )
}


export default App