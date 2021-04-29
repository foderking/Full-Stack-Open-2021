import React, { useState, useEffect } from 'react'
import serve from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [no, setNo] = useState('')
  const [filter, setFilter] = useState('')
  const stateData = [['Name', newName, setNewName], ['Number', no, setNo]]
  const [error, setError] = useState(false)
  const [classtype, setType] = useState('')

  useEffect(
    () => {
      serve.getPersons()
        .then(personData => setPersons(personData))
    },
  [])

  const search = (value) => {
    return value.name.toLowerCase().startsWith(filter.toLowerCase())      // finds names in phonebook that start with name stored in the"filter" state
  }

  const notify = (message, type) => {
    setError(message)
    setType(type)
    console.log(type==="success")
    setTimeout(() => setError(false), type === "success" ? 3000 : 6000)
  }

  const buttonSubmit = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`id: ${id} deleted`)
      serve.deletePerson(id)
        .then(response => {
          serve.getPersons()
            .then(personData => setPersons(personData))        
        })
        .catch(error => {
          notify(`${error}: Could not delete ${newName}`, "error")
        })
    }
    notify(`Deleted ${name}`, "success")
  }

  const submitNew = (event) => {
    event.preventDefault()
    const newPers = {
      name: newName,
      number: no 
    }

    if (persons.filter(each => each.name === newName).length) {           // Updates phonebook
      if(window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)) {
        const id_ = persons.find(each => each.name === newName).id
        serve.changePerson(id_, newPers)
          .then(response => {
            setPersons(persons.map(each => each.id === id_ ? response : each))
          })
          .catch( error => {
            notify(`${error}: Could not update ${newName}`, "error")
          })
        notify(`Updated ${newName}`, "success")
      } 
    } else {                    // Adds new entry for phonebook
        serve.addPerson(newPers)
          .then(response => {
            setPersons(persons.concat(response))
          })
          .catch(error => {
            notify(`${error}: Could not add ${newName}`, "error")
          })

        notify(`Added ${newName}`, "success")
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      {error ? <Notification message={error} class_={classtype} /> : <></>}
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
    Filter shown with 
    <input 
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
        each => 
        <Input 
          key={each[0]} 
          text={each[0]} 
          value={each[1]} 
          handler={each[2]} 
        />
      )}
      <button type="submit" >add</button>
    </form>  
  </div>

const Input = (props) => 
  <div>
    {props.text}: 
    <input 
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
  return (
    <div>
      {name} {number}
      <button onClick={() => button(id, name)}>
        delete
      </button>
    </div>
  )
}

const Notification = ({ message, class_}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={class_}>
      {message}
    </div>
  )
}

export default App