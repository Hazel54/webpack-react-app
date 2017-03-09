import React, { PropTypes } from 'react'

import './style.css'

function Header(props) {
  return (
    <header>{props.title}</header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
