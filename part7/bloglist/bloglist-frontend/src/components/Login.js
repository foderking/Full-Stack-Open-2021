import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'
import InputComp from '../components/InputComp'
import loginService from '../services/login'

const Login = ({ notify }) => {
	window.localStorage.setItem('activeUser', null)
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const username = login.username
	const setUsername = (message) => dispatch(helper('username', message))

	const password = login.password
	const setPassword = (message) => dispatch(helper('password', message))

	const setUser = (message) => dispatch(helper('user', message))


	function handleLogin(e)
	{
		e.preventDefault()
		// console.log('hahahahahaahahha')

		loginService
			.login({
				username, password,
			})
			.then(data => {
				notify(`${data.username} logged in successfully` , 'success')
				setUser(data)
				console.log(data)

				window.localStorage.setItem('activeUser', data.token)
				setUsername('')
				setPassword('')
			})

	}

	return (
		<div>
			<h2>Log in to application</h2>

			<form onSubmit={handleLogin}>
				<div>
					<InputComp
						desc='Username'
						type='text'
						value={username}
						change={setUsername}
					/>
				</div>

				<div>
					<InputComp
						desc='Password'
						type='password'
						value={password}
						change={setPassword}
					/>
				</div>

				<button type="submit">login</button>
			</form>
		</div>
	)
}


export default Login