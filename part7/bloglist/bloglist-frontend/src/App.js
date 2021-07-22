import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import AllBlog from './components/AllBlog'
import ViewBlogs from './components/ViewBlogs'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from './reducers/Reducer'
import { Switch, Route } from 'react-router-dom'

const App = () =>
{
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const setBlogs = (message) => dispatch(helper('blogs', message))

	const user = login.user
	const error  = login.error

	const setError = (message) => dispatch(helper('error', message))
	const setType = (message) => dispatch(helper('class', message))


	function notify (message, type)
	{

		setError(message)
		setType(type)
		setTimeout(() => setError(false), 4000 )
	}

	console.log(login)

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs =>
				setBlogs( blogs )
			)
	}, [])

	return (
		<div>
			{
				error
					? <Notification />
					: <></>
			}
			<Switch>
				<Route path='/user'>
					{
						user === null
							? 'you need to login'
							: <Users  notify={ notify } />
					}
				</Route>

				<Route path='/blog/:id'>
					{
						user === null
							? 'you need to login'
							:	<AllBlog notify={ notify } />
					}
				</Route>

				<Route path='/blog'>
					{
						user === null
							? 'you need to login'
							: <ViewBlogs />
					}
				</Route>

				<Route path='/'>
					{
						user === null
							? Login({ notify })
							: Blogs({ notify })
					}
				</Route>
			</Switch>

		</div>
	)
}



export default App