// const getId = () => (100000 * Math.random()).toFixed(0)

// export const asObject = (id, anecdote) => {
//   return {
//     content: anecdote,
//     id,
//     votes: 0
//   }
// }

export const addVote = (id, anecdotes) => {
  const note = anecdotes.find(each => each.id === id)
  return {
    type:'VOTE' ,
    data:{
    ...note, votes: note.votes+1
    }
  }
}

export const createNote = content => 
  ({
    type:'APPEND',
    data: content
  })

const reducer = (state = [], action) =>
{
	switch(action.type)
	{
		// case 'NEW_NOTE':
		// 	return state.concat(asObject(action.data))
		case 'VOTE':
			return state.map(each => each.id === action.data.id ? action.data : each)
		// case 'INIT':
		// 	return state.concat(action.data)
		case 'APPEND':
			return state.concat(action.data)

		default:
			return state
	}
}

export default reducer