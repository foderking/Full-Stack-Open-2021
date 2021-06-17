export const newNotification = notif => {
	return {
		type: 'NOTIFY',
		notification: notif
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