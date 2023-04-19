import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( state => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    color: notification === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
