import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';

const Books = (props) => {
	const [filter, SetFilter] = useState('')

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
	let books = []
	const res = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
	if (res.loading) { 
		return <p>Loading...</p>
	}
	console.log(res)

	books  = res.data.allBooks

	// const rand = books.map(each => each.genres)
	const gens = [].concat.apply([], books.map(each => each.genres))
	const genres = [...new Set(gens)]


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
						.filter(each => each.genres.includes(filter) || filter === 'all_')
						.map(a =>
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
          )}
        </tbody>
      </table>
			{
				genres.map(each =>
					<button key={each} onClick={() => SetFilter(each)}>{each}</button>
				)
			}
			<button onClick={() => SetFilter('all_')}>show all</button>
    </div>
  )
}

export default Books