import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FastClick from 'fastclick'
import { Toast } from '../components'

import { syncError } from '../actions/config'
import { setGlobalHandler } from '../utils/request'

class App extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  componentDidMount() {
    FastClick.attach(document.body)
    setGlobalHandler(this.onGlobalError.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.errorReceivedAt !== this.props.errorReceivedAt) {
      this.refs.toast.show({
        type: 'error',
        msg: nextProps.error
      })
    }

    if (nextProps.message && nextProps.msgReceivedAt !== this.props.msgReceivedAt) {
      this.refs.toast.show({ msg: nextProps.message })
    }
  }

  onGlobalError(errMsg, status) {
    if (status === 401) {
      this.context.router.replace('/login')
    } else if (status !== 200) {
      this.props.syncError(errMsg)
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Toast ref="toast" />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  syncError: PropTypes.func,
  message: PropTypes.string,
  error: PropTypes.string,
  errorReceivedAt: PropTypes.number,
  msgReceivedAt: PropTypes.number,
}

App.contextTypes = {
  router: PropTypes.object
}

export default connect(
  state => ({
    error: state.config.error,
    errorReceivedAt: state.config.errorReceivedAt,
    message: state.config.message,
    msgReceivedAt: state.config.msgReceivedAt
  }), {
    syncError,
  }
)(App)
