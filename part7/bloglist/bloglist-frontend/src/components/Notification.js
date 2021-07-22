import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () =>
{
	const main = useSelector(state => state)
	const error  = main.error
	const classtype = main.class

	if (error === null) {
		return null
	}

	return (
		<div className={`alert alert-${classtype === 'error' ? 'danger' : classtype}`}>
			{error}
		</div>
	)
}



export default Notification
