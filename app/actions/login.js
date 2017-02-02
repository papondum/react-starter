export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: {  'Accept': 'application/json',
                'Content-Type': 'application/json' },
    body: JSON.stringify({"username":creds.username ,"password":creds.password})
  }
  const url = '/user/login'
  const {hostname, protocol} = window.location
  const serverUrl = `${protocol}//${hostname}:4040${url}`
    fetch(serverUrl, config)
    .then(response =>
      response.json().then(user => ({ user, response }))
          ).then(({ user, response }) =>  {
      if (!response.ok) {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginError(user.message))
        return Promise.reject(user)
      }
      else {
        console.log('OK');
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.id_token)
        // Dispatch the success action
        console.log(user);
        // dispatch(receiveLogin(user))
      }
    }).catch(err => console.log("Error: ", err))

  // return dispatch => {
  //   // We dispatch requestLogin to kickoff the call to the API
  //   dispatch(requestLogin(creds))
  //
  //   return fetch('http://localhost:4040/user/login', config)
  //     .then(response =>
  //       response.json().then(user => ({ user, response }))
  //           ).then(({ user, response }) =>  {
  //       if (!response.ok) {
  //         // If there was a problem, we want to
  //         // dispatch the error condition
  //         dispatch(loginError(user.message))
  //         return Promise.reject(user)
  //       }
  //       else {
  //         // If login was successful, set the token in local storage
  //         localStorage.setItem('id_token', user.id_token)
  //         // Dispatch the success action
  //         dispatch(receiveLogin(user))
  //       }
  //     }).catch(err => console.log("Error: ", err))
  // }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
