import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = notification
    ? 
      {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    :
      {}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}


const mapNotificationToProps = (state) => 
({
	notification: state.notification
})


const Connected = connect(mapNotificationToProps)(Notification)
export default Connected