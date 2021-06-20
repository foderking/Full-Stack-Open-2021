import server from '../services/anecdotes'


export const addVote = (data) => {
	return async dispatch => {
		data = {
			...data, votes: data.votes+1
    }
		const res  = await server.put(data.id, data)
		
		dispatch({
			type: 'VOTE',
			data: res
		})
  }
}

export const createNote = content => 
  ({
    type:'APPEND',
    data: content
  })

export const initializeNotes = () => {
	return async dispatch => {
		const data = await server.getAll()
		dispatch(createNote(data))
	}
}

export const addNotes = (content) => {
	return async dispatch => {
		const data = await server.post({content,votes:0})
		dispatch(createNote(data))
	}
}

const reducer = (state = [], action) =>
{
	switch(action.type)
	{
		case 'VOTE':
			return state.map(each => each.id === action.data.id ? action.data : each)
		case 'APPEND':
			return state.concat(action.data)

		default:
			return state
	}
}

export default reducer