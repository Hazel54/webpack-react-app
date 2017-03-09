import {
  LOGIN,
  GET_SMS_CODE,
  SYNC_ERROR,
  SYNC_MESSAGE
} from '../constants'

import assign from 'lodash.assign'

const initialState = {
  error: '',
  errorReceivedAt: null,
  message: '',
  msgReceivedAt: null,

  smsHash: null,
  login: false
}

export default function update(state = initialState, action) {
  switch (action.type) {

    case SYNC_ERROR:
      return assign({}, state, {
        error: action.error,
        errorReceivedAt: action.receivedAt
      })

    case SYNC_MESSAGE:
      return assign({}, state, {
        message: action.msg,
        msgReceivedAt: action.receivedAt
      })

    case GET_SMS_CODE:
      return assign({}, state, {
        smsHash: action.json
      })

    case LOGIN:
      return assign({}, state, {
        login: action.json
      })

    default:
      return state
  }
}
