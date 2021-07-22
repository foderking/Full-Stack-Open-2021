const init = {
	username : '',
	password : '',
	user: null,
	error:  '',
	class: 'success',
	blogs: [],
	title: '',
	author: '',
	url: '',
	comment: '',
	visibility: true,
	allUser: []
}

export function helper (type, data)
{
	return { type, data }
}

function reducer (state=init , action)
{
	switch (action.type) {
	case 'username':
		return { ...state, username: action.data }

	case 'password':
		return { ...state, password: action.data }

	case 'user':
		return { ...state, user: action.data }

	case 'error':
		return { ...state, error: action.data }

	case 'class':
		return { ...state, class: action.data }

	case 'blogs':
		return { ...state, blogs: action.data }

	case 'title':
		return { ...state, title: action.data }

	case 'author':
		return { ...state, author: action.data }

	case 'url':
		return { ...state, url: action.data }

	case 'comment':
		return { ...state, comment: action.data }

	case 'visibility':
		return { ...state, visibility: action.data }

	case 'allUser':
		return { ...state, allUser: action.data }

	default:
		return state
	}
}

export default reducer