import React, { useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const Books = (props) => {
	const [rec_genre, SetRec] = useState([])

	const ALL_BOOKS = gql`
	query Query($genre: String) {
		allBooks(genre: $genre) {
			title
			published
			genres
			author {
				name
			}
		}
	}
	`
	const user = gql`
	query {
		me {
			favoriteGenre
		}
	}
	`
	const { loading, error, data } = useQuery(user)

	const [allBook, result] = useLazyQuery(ALL_BOOKS)

	useEffect(() => {
		if (result.data) {
			const all = result.data.allBooks
			SetRec(all)
			console.log(rec_genre)
		}
	}, [SetRec, result])

	useEffect(() => {
		if (data) {

			console.log(data)
			allBook({ variables: { genre: data.me.favoriteGenre } })
		}
	}, [data, allBook])

	if (!props.show) {
		return null
	}

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
					{rec_genre
						.map(a =>
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						)}
				</tbody>
			</table>
		</div>
	)
}

export default Books