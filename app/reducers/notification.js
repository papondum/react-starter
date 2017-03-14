import { createReducer } from '../utils';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notification'
import { LOGOUT_SUCCESS} from '../actions/login'

const initialState = {};

let actions = {
  [LOGOUT_SUCCESS]: (state, payload) => {
    return initialState
  },
  [ADD_NOTIFICATION]: (state, payload) => {
    return Object.assign({}, state, {
      message: payload.message,
      level: payload.level,
      options: payload.options,
    })
  },
  [REMOVE_NOTIFICATION]: (state, payload) => {
    return {}
  },
}

export default createReducer(initialState, actions)
