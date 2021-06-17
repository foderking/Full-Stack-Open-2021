import React from 'react'
import { useDispatch } from 'react-redux'

const Filter = () => 
{
	const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
		dispatch({
			type: 'FILTER',
			filter: event.target.value
		})
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter