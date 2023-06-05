import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const displayNotification = useSelector(state => state.notification.displayNotification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: displayNotification ? 'block' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification