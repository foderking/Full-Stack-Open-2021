const filterReducer = (state  = '' , action) => 
{
	switch (action.type) {
		case 'FILTER':
			return action.filter

		default:
			return state
	}
}

export const filterHelper =	(value) =>	({
			type: 'FILTER',
			filter: value
		})

export default filterReducer