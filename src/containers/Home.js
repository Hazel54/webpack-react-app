import React, { Component } from 'react'
import { Link } from 'react-router'
import { Header, Modal } from '../components'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
      showClose: true
    }
  }

  openModal() {
    this.setState({
      modalShow: true
    })
  }

  closeModal() {
    this.setState({
      modalShow: false,
      modalType: ''
    })
  }

  render() {
    const { modalShow, showClose } = this.state

    return (
      <div className="home-wrap">
        <Header title="home" />

        <div className="home-body">
          <Link to="/login">transition to login</Link>
          <br />
          <br />
          <br />
          <button onClick={() => this.openModal()}>
            show modal
          </button>
        </div>

        <Modal visible={modalShow} showClose={showClose} close={() => this.closeModal()}>
          <div className="modal-boby">我是一个modal</div>
        </Modal>

      </div>
    )
  }
}

export default Home
