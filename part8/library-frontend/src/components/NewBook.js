import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

	const ADD_BOOK = gql`
	mutation AddBookMutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			title
			published
		}
	}
	`
	const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author
		}
	}
	`

	const [ addBook ] = useMutation(ADD_BOOK,  {
    refetchQueries: [ { query: ALL_BOOKS } ] 
	})

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
		addBook({ variables: {published: parseInt(published), author, title, genres}})

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook