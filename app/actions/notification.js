export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export function addNotification(message, level, options) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      message,
      level,
      options,
    },
  }
}

export function removeNotification() {
  return dispatch => {
    dispatch({
      type: REMOVE_NOTIFICATION,
    })
    return Promise.resolve()
  }
}
