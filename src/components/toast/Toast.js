import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'

import './style.scss'


function InnerClass(props) {
  const classname = props.type ? `toast animated ${props.type}` : 'toast animated'
  const animation = props.display ? 'bounceOutDown' : 'hidden'
  return (
    <span className={`${classname} ${animation}`}>
      {props.msg}
    </span>
  )
}

class Toast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false,
      type: '',
      msg: ''
    }
    this.timer = null
    this.clearToastStatus = this.clearToastStatus.bind(this)
  }

  componentDidMount() {
    const { type, display, msg } = this.state

    this.toastDom = document.createElement('div')
    this.toastDom.id = '__toast__'
    document.body.appendChild(this.toastDom)
    ReactDom.render(<InnerClass type={type} display={display} msg={msg} />, this.toastDom)
  }

  componentDidUpdate() {
    const { type, display, msg } = this.state
    ReactDom.render(<InnerClass type={type} display={display} msg={msg} />, this.toastDom)
  }

  show({ type, msg }) {
    if (this.timer) return
    this.timer = setTimeout(this.clearToastStatus, 3000)

    this.setState({
      msg,
      type,
      display: true
    })
  }

  clearToastStatus() {
    if (this.state.display) {
      this.timer = null
      this.setState({
        display: false,
        type: ''
      })
    }
  }

  render() {
    return null
  }
}

InnerClass.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
  display: PropTypes.bool
}

export default Toast
