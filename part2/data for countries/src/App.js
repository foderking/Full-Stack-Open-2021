import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [state, setState] = useState([])
  const [query, setQuery] = useState('')

  // finds names in phonebook that start with name stored in the"filter" state
  const search = (value) => {
    return value.name.toLowerCase().startsWith(query.toLowerCase())
  }
  // fetches json data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("Json recieved")
        setState(response.data)
      })
  }, [])

  return (
    <div>
      <Filter search={setQuery} data={query}/>
      <ViewCountries search={search} data={state} />
    </div>
  )
}

const ViewCountries = ({data, search}) => {
  // filters data to only names that match input
  const filteredList = data.filter(
    each => search(each)
  )
  return (
    <div>
      {filteredList.map(
        each => <p key={each.name} >{each.name}</p>
        )}
    </div>
    )
}

// Create filter for countries to display
const Filter = (props) => 
    <div>
      Find countries 
      <input type='text' value={props.data} onChange={
        (event) => props.search(event.target.value)
      }/>
    </div>


export default App