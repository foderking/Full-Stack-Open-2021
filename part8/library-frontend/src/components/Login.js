import React, { useState, useEffect } from "react";
import { gql, useMutation } from '@apollo/client';

const Login = ({show, setToken}) => {
	const [name, SetName] = useState('')
	const [pass, SetPass] = useState('')
	const [error, SetError] = useState('')

	const LOGIN = gql`
	mutation LoginMutation($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
	`

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			SetError(error.graphQLErrors[0].message)
		}
	})



	function submit(e) {
		e.preventDefault()

		login({ variables: { username: name, password: pass } })

		SetName('')
		SetPass('')
	}

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value     
			setToken(token)     
			localStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data]) // eslint-disable-line

	if (!show) {
		return null
	}
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={submit}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => SetName(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={pass}
						onChange={({ target }) => SetPass(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default Login