import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import LoggedIn from './LoggedIn'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'
import { Route, useParams, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'

const Users = ({ notify }) =>
{
	const { path , url } = useRouteMatch()

	const dispatch = useDispatch()

	const allUser = useSelector(state => state.allUser)
	const currentUser = useSelector(state => state.user).username

	console.log(allUser)


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

			<Route path={`${path}/:id`} >
				<EachUser current={currentUser} allUser={allUser} />
			</Route>

			<Route exact path={`${path}`} >
				<ShowInfo state={allUser} url={url} />
			</Route>
		</div>
	)
}

const EachUser = ({ current, allUser }) =>
{
	const  routeId  = useParams().id
	const rnad = allUser.find(each => each.id === routeId  && each.username === current)

	console.log(rnad, routeId)

	if (!rnad) {
		return(
			<h3>Invalid User</h3>
		)
	}

	return (
		<div>
			<h2>{current}</h2>
			<h3>added blogs</h3>

			<ul>
				{
					rnad.blogs.map( each =>
						<li key={each.id} >{each.title}</li>
					)
				}
			</ul>
		</div>
	)
}


const ShowInfo =({ state, url }) =>
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
								<td>
									<Link to={`${url}/${each.id}`} >
										{each.username}
									</Link>
								</td>
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
