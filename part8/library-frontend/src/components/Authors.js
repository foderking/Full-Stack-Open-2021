import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const Authors = (props) => {
	let authors = [{
		"name": "Robert Martin",
		"bookCount": 2,
		"born": 1952
	}]

	const [name, SetName] = useState('')
	const [born, SetBorn] = useState('')

	const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
	`
	const EDIT_AUTHOR = gql`
	mutation EditAuthorMutation($name: String!, $setbornto: Int!) {
		editAuthor(name: $name, setBornTo: $setbornto) {
			name
			bookCount
			born
		}
	}
	`

	const [ addBook ] = useMutation(EDIT_AUTHOR,  {
		refetchQueries: [ { query: ALL_AUTHORS } ] 
	})

	const res = useQuery(ALL_AUTHORS)

	if (!props.show) {
		return null
	}

	if (res.loading) {
		return <p>Loading...</p>
	}

	authors = res.data.allAuthors

	function submit (e) {
		e.preventDefault()
		
		addBook({variables: {name, setbornto: parseInt(born) }})
	}
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							born
						</th>
						<th>
							books
						</th>
					</tr>
					{authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>

			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<div>
				name
				<select value={name} onChange={({ target }) => SetName(target.value)}>
					{
						authors.map(each => <option key={each.name} value={each.name}>{each.name}</option>)
					}
				</select>
        </div>

        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => SetBorn(target.value)}
          />
        </div>

				<button type='submit'>submit</button>

			</form>
		</div>
	)
}

export default Authors
