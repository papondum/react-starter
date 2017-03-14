import React, { Component } from 'react'
import NotificationSystem from 'react-notification-system'

class NotificationContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem
  }

  componentWillReceiveProps(newProps) {
    const { message, level, options } = newProps.notification
    if (options) {
      options.message = message
      options.level = level
      this.notificationSystem.addNotification(options)
      this.props.removeNotification()
      this.props
    } else if (message && level){
      this.notificationSystem.addNotification({
        message,
        level,
      })
      this.props.removeNotification()
    }
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    )
  }
}

export default NotificationContainer

