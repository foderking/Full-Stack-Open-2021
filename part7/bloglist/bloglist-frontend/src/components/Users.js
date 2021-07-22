import React, { useEffect } from 'react'
// import React from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'
import LoggedIn from './LoggedIn'

const Users = ({ notify }) =>
{
	const dispatch = useDispatch()
	const allUser = useSelector(state => state.allUser)


	useEffect(() => {
		blogService.getUsers()
			.then(ech =>
				dispatch(helper('allUser', ech.data))
			)

	}, [])


	return (
		<div>
			<h2>blogs</h2>
			<LoggedIn notify={notify} />
			<ShowInfo state={allUser} />
		</div>
	)
}


const ShowInfo =({ state }) =>
{
	return (
		<div>

			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>blogs created</th>
					</tr>
					{
						state.map(each =>
							<tr key={each.id} >
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
