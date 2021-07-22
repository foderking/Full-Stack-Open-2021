import React from 'react'
import InputComp from '../components/InputComp'
import loginService from '../services/login'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'

const Login = ({ notify }) =>
{
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
			.catch(e =>
				notify(e.response.data.error, 'error')
			)
	}

	return (
		<div className="container py-5 border-1 h-100 d-flex justify-content-center">
			<div className="jumbotron my-auto">
				<h1 className="display-3 py-3">Log in to application</h1>

				<div className='d-flex justify-content-center' >
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

						<button type="submit" className='btn btn-primary'>login</button>
					</form>

				</div>
			</div>
		</div>
	)
}


export default Login