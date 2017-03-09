import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getSmsCode, login, syncMessage } from '../actions/config'

class Login extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      phoneNumber: '',
      smsCode: '',
      sending: false,
      timeLeft: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { smsHashValue } = nextProps
    if (smsHashValue && smsHashValue !== this.props.smsHashValue) {
      this.setState({
        sending: false
      }, () => this.startPassedTime())
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout)
  }

  hanldeSend() {
    this.setState({
      sending: true
    }, this.sendSmsCode)
  }

  handleFail() {
    this.setState({
      sending: false
    })
  }

  startPassedTime() {
    this.setState({
      timeLeft: 60
    })

    const callee = () => {
      if (this.state.timeLeft > 0) {
        this.setState({
          timeLeft: this.state.timeLeft - 1
        })
        this.timeout = setTimeout(callee, 1000)
      }
    }
    this.timeout = setTimeout(callee, 1000)
  }

  changeValue(value, name) {
    let v = value
    const reg = /^\d{0,11}$/g
    if (name === 'phoneNumber') {
      v = reg.test(value) ? value : this.state.phoneNumber
    }
    this.setState({
      [name]: v
    })
  }

  isMobile(num) {
    const reg = /^1+\d{10}$/
    return reg.test(num)
  }

  checkMobile(num) {
    let msg = ''
    if (!this.isMobile(num)) msg = '您输入的手机号码格式不对'
    this.setState({ err: msg })
  }

  sendSmsCode() {
    const { phoneNumber } = this.state
    const condi = {
      mobile: phoneNumber
    }
    this.props.getSmsCode(condi)
  }

  handleLogin() {
    this.props.syncMessage('登录成功')
    this.context.router.replace('/')
  }

  render() {
    const { phoneNumber, smsCode, sending, timeLeft } = this.state
    const time = timeLeft > 0 ? `${timeLeft} 秒` : '发送验证码'
    const isSendDisabled = (
      !this.isMobile(phoneNumber) || sending || timeLeft > 0
    )

    return (
      <div className="login-wrap">
        <ul className="form">
          <li>
            <span className="icon icon-mobile"></span>
            <input
              type="tel"
              placeholder="请输入手机号"
              value={phoneNumber}
              onChange={e => this.changeValue(e.target.value, 'phoneNumber')}
              onBlur={() => this.checkMobile(phoneNumber)}
            />
          </li>
          <li>
            <span className="icon icon-sms"></span>
            <input
              type="tel"
              className="input-captcha"
              placeholder="请输入短信验证码"
              value={smsCode}
              onChange={e => this.changeValue(e.target.value, 'smsCode')}
            />
            <button
              className="btn-sms"
              disabled={isSendDisabled}
              onClick={() => this.sendSmsCode()}
            >
              {sending ? '发送中...' : time}
            </button>
          </li>
        </ul>
        <p className="err-msg"></p>
        <button
          className="btn-login"
          disabled={!this.isMobile(phoneNumber) || !smsCode}
          onClick={() => this.handleLogin()}
        >
          立即登录
        </button>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  getSmsCode: PropTypes.func,
  smsHashValue: PropTypes.string,
  syncMessage: PropTypes.func
}

Login.contextTypes = {
  router: PropTypes.object
}

export default connect(
  state => ({
    smsHashValue: state.config.smsHash
  }), {
    getSmsCode,
    login,
    syncMessage
  }
)(Login)
