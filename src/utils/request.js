import request from 'superagent'
import { BASEURI } from '../constants'

let globalErrorHandler
export const setGlobalHandler = function (handler) {
  globalErrorHandler = handler
}

export default function (conf = {}) {
  const method = conf.method || 'get'
  const data = conf.data
  const succ = conf.success
  const error = conf.error
  const api = `${BASEURI}${conf.url}`

  const handleEnd = function (err, res) {
    // 登录接口特殊处理
    if (conf.url === '/api/distribution/login' && res.status === 200 && succ) {
      succ()
      return
    }

    if (conf.url === '/api/distribution/address' && globalErrorHandler && !res) {
      globalErrorHandler('网络错误', 401)
    }

    if (res && !res.body) {
      if (res.status === 200 && succ) {
        succ(null, null, res)
      } else if (res.status !== 401 && globalErrorHandler) {
        globalErrorHandler('系统异常')
      } else if (globalErrorHandler) {
        globalErrorHandler('登录失败')
      }
    } else if (res && res.ok && res.body && res.body.code === '200' && succ) {
      succ(res.body.data, res.body, res)
    } else if (res && res.body && res.body.code === '401' && globalErrorHandler) {
      globalErrorHandler('未登录', 401)
    } else {
      const msg = res && res.body && res.body.msg || '网络异常'
      if (error) error(msg)
      if (globalErrorHandler) globalErrorHandler(msg)
    }
  }

  const enterpriseLoc = localStorage.getItem('enterpriseLoc')
  if (method === 'get') {
    request[method](api)
      .query(data)
      .set('X-Shard', enterpriseLoc ? `loc=${enterpriseLoc}` : null)
      .withCredentials()
      .end(handleEnd)
  } else {
    request[method](api)
      .set('Content-Type', 'application/json')
      .set('X-Shard', enterpriseLoc ? `loc=${enterpriseLoc}` : null)
      .send(data)
      .withCredentials()
      .end(handleEnd)
  }
}
