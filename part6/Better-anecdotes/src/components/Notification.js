import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)

  // dispatch(newNotification('eh'))

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
      {/* render here notification... */}
    </div>
  )
}

export default Notification