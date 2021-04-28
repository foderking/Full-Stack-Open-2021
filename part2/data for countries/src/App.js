import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [state, setState] = useState([])
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState({name: ''})

  // finds names in phonebook that start with name stored in the "filter" state
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
      <Filter 
        search={setQuery} 
        data={query} 
        change={setCountry} 
      />
      <ViewCountries 
        search={search} 
        data={state} 
        changeCountry={setCountry} 
        country={country}/>
    </div>
  )
}

const ViewCountries = ({data, search, changeCountry, country}) => {
  // filters data to only names that match input
  const filteredList = data.filter(
    each => search(each)
  )

  if (filteredList.length > 10) {     // handles when the search results are > 10
    return (
      <div>
        Too many matches, specify another filter
      </div>
      )
  } else if (filteredList.length === 1  ) {         // handles when there is only one search result
    const langList = filteredList[0].languages.map(     // neatly creates an array from the language object
      each => each.name
    )
    return (
      <DisplayCountry 
        name={filteredList[0].name} 
        capital={filteredList[0].capital}
        population={filteredList[0].population}
        laguages={langList}
        flag={filteredList[0].flag}
      />
      )
  } else if (country.name !== ''){        // handles when the "show" button is clicked
    return (
      <DisplayCountry 
        name={country.name} 
        capital={country.capital}
        population={country.population}
        laguages={country.languages.map(
          each => each.name
        )}
        flag={country.flag}
      />
      )
  } else {                              // handles when there are between 1 - 10 search results
    return (
      <div>
        {filteredList.map(
          each => 
            <div key={each.name}>
              {each.name}
              <button onClick={
                (event) => { changeCountry(each) }
              }>
                show
              </button>
            </div>
          )}
      </div>
      )
  }
}

// Create filter for countries to display
const Filter = (props) => 
    <div>
      Find countries 
      <input type='text' value={props.data} onChange={
        (event) => {
          props.search(event.target.value)
          props.change({name: ''})
        }
      }/>
    </div>

// Displays information for a single country
const DisplayCountry = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Capital {props.capital}</p>
      <p>Population {props.population}</p>
      <h3>Languages</h3>
      <ul>
        {props.laguages.map(
          each => <li key={each}>{each}</li>
        )}
      </ul>
      <img 
        src={props.flag} 
        alt={props.name} 
        width="500" 
        height="300" 
      />
    </div>
    )
}


export default App