import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from './reducers/Reducer'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'

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
							// ? Login({ notify })
							? 'you need to login'
							: <Users  notify={ notify } />
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