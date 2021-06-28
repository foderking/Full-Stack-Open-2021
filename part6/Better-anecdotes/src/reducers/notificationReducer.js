let id

export const newNotification = notif => {
	return {
		type: 'NOTIFY',
		notification: notif
	}
}

export const notify = (message, time) => {
	return async dispatch => {
		dispatch(newNotification(message))
		clearTimeout(id)
		id = setTimeout(() => dispatch(newNotification('')), time*1000)
	}
}

const notificationReducer = (state = '', action) =>
{
	switch (action.type) {
		case 'NOTIFY':
			return action.notification

		default:
			return state
	}
}


export default notificationReducer