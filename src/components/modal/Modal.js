import React, { PropTypes } from 'react'
import './style.scss'

function Modal(props) {
  const closeBtn = props.showClose ?
    <div className="btn-close" onClick={props.close}>
    </div> : null

  if (!props.visible) return null

  return (
    <div className="mask-wrap">
      <div className="modal-wrap">
        <div className="modal">
          {props.children}
        </div>
        {closeBtn}
      </div>
    </div>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  showClose: PropTypes.bool,
  children: PropTypes.node,
  close: PropTypes.func
}

export default Modal
