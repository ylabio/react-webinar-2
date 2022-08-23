import React from 'react'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
function LinkMenu({ path, children }) {
  return (
    <Link style={{ color: 'black', textDecoration: 'none' }} to={path}>
      {children}
    </Link>
  )
}
LinkMenu.propTypes = {
  path: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
}

export default LinkMenu