import React from 'react'
import { connect } from 'react-redux'
import { filterHelper } from '../reducers/filterReducer'

const Filter = (props) => 
{
  const style = {
    marginBottom: 10
  }
  const handleChange = (event) => {
		props.filterHelper(event.target.value)
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapStatetoProps = (state) => 
	({state: state})

const mapDispatchToProps = {
  filterHelper
}

const Connected = connect(mapStatetoProps, mapDispatchToProps)(Filter)
export default Connected