
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recc from './components/Reccomended'
import {
	useQuery, useMutation, useSubscription, useApolloClient, gql
} from '@apollo/client';


const App = () => {

	const BOOK_ADDED = gql`
	subscription {   
		bookAdded {     
			title
			published
			genres
			author {
				name
			}
		} 
	}  
	`
	const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			genres
			author {
				name
			}
		}
	}
	`
  const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	if (!token) {
		localStorage.clear()   
	}

	const logout = () => {   
		setToken(null)   
		localStorage.clear()   
		client.resetStore() 
	}

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

	useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
      // console.log(subscriptionData)
			window.alert(`${addedBook} added` )
			updateCacheWith(addedBook)
    }
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
				{
					token
					?
					<>
					<button onClick={() => setPage('add')}>add book</button>
					<button onClick={() => setPage('rec')}>Reccomended</button>
					<button onClick={() => logout()}>logout</button>
					</>
					:
					<button onClick={() => setPage('login')}>login</button>
				}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />


      <NewBook
        show={page === 'add'}
      />
{
	token ?

			<Recc
        show={page === 'rec'}
      />
			:

			<Login
				setToken={setToken}
        show={page === 'login'}
      />
}

    </div>
  )
}

export default App