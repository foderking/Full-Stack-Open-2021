import React from 'react'
import { helper } from '../reducers/Reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoggedIn = ({ notify }) => {
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const user = login.user
	const setUser = (message) => dispatch(helper('user', message))

	const history = useHistory()

	const handleLogout = (event) =>
	{
		event.preventDefault()

		notify('logged out successfully' , 'success')
		history.push('/')
		setUser(null)
	}


	return (
		<form onSubmit={handleLogout}>
			{user? user.username : 'no one'} is logged in
			<button type="submit" >logout</button>
		</form>
	)
}

export default LoggedIn
