import React, { useState } from 'react'
import blogService from '../services/blogs'

const Users = () => {

	const [state, setstate] = useState([])


	blogService.getUsers()
		.then(each => setstate(each.data))

	function gen()
	{
		Math.floor(Math.random() *  1000)
	}

	return (
		<div>

			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td><h3>Username</h3></td>
						<td><h3>blogs created</h3></td>
					</tr>

					{
						state.map(each =>
							<tr key={gen()} >
								<td>{each.username}</td>
								<td>{each.blogs.length}</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
	)
}

export default Users
