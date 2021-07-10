import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useHistory, useParams
} from "react-router-dom"
import { useField } from './hooks'





const Menu = () => 
{
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => 
(
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`anecdote/${anecdote.id}`} >
            {anecdote.content}
          </Link>
        </li>
      )}
    </ul>
  </div>
)


const About = () => 
(
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)


const Footer = () => 
(
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const View = ({anecdotes}) => 
{
  const id = useParams().id
  const anec = anecdotes.find( each => each.id === id )
  console.log(id, anec)
  
  return (
    <div>
      <h2>{anec.content} by {anec.author}</h2>
      has {anec.votes} votes    
      for more info, see <a href={anec.info}>here</a>
    </div>
  )
}


const CreateNew = (props) => 
{
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.main.value,
      author: author.main.value,
      info: info.main.value,
      votes: 0
    })

    history.push('/')

    props.setNotification('')
    props.setLast(content.main.value)

    setTimeout( () => {
        props.setNotification('none')
      }, 10000
    )
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.main} />
        </div>
        <div>
          author
          <input {...author.main} />
        </div>
        <div>
          url for more info
          <input {...info.main} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}


const App = () => 
{
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('none')
  const [lastanec, setLast] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const notif = {
    display: notification
  }


  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notif={notif} lastanec={lastanec} />
      <Switch>
        <Route path='/about'>
          <About />
        </Route> 
        <Route path='/create'>
          <CreateNew setLast={setLast} setNotification={setNotification} addNew={addNew} />
        </Route> 
        <Route path='/anecdote/:id'>
          <View anecdotes={anecdotes} />
        </Route> 
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route> 
      </Switch>
      <Footer />
    </Router>
  )
}

const Notification = ({notif, lastanec}) => 
  <p style={notif} > a new anecdote {lastanec} created!</p>


export default App;