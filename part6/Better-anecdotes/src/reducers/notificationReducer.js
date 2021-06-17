const init = 'Welcome to the Application'


export const newNotification = notif => {
	return {
		type: 'NOTIFY',
		notification: notif
	}
}

const notificationReducer = (state = init, action) =>
{
	switch (action.type) {
		case 'NOTIFY':
			return action.notification

		default:
			return state
	}
}


export default notificationReducer