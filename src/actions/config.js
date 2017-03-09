import {
  LOGIN,
  GET_SMS_CODE,
  SYNC_ERROR,
  SYNC_MESSAGE
} from '../constants'
import request from '../utils/request'

export function syncError(error) {
  return dispatch => {
    dispatch({
      type: SYNC_ERROR,
      receivedAt: Date.now(),
      error
    })
  }
}

export function syncMessage(msg) {
  return dispatch => {
    dispatch({
      type: SYNC_MESSAGE,
      receivedAt: Date.now(),
      msg
    })
  }
}

export function getSmsCode(condi) {
  console.log(condi)
  return dispatch => {
    dispatch({
      type: GET_SMS_CODE,
      receivedAt: Date.now(),
      json: 'iamsmshashvaluexxxxxx123456'
    })
  }
}

// export function getSmsCode(condi) {
//   return dispatch => {
//     request({
//       url: '/api/distribution/getSmsVerifyCode',
//       data: condi,
//       success: data => {
//         dispatch({
//           type: GET_SMS_CODE,
//           receivedAt: Date.now(),
//           smsHashValue: data
//         })
//       }
//     })
//   }
// }

export function login(condi) {
  return dispatch => {
    request({
      method: 'post',
      url: '/api/distribution/login',
      data: condi,
      success: json => {
        dispatch({
          type: LOGIN,
          json,
          receivedAt: Date.now()
        })
      }
    })
  }
}

