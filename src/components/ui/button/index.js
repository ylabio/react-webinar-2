import React from 'react'
import propTypes from 'prop-types';
import './style.css'

export function Button({children, className, onClick}) {
  const classnames = `Button ${className}`
  return (
    <button className={classnames} onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  className: propTypes.string,
  onClick: propTypes.func
}

Button.defaultProps = {
  children: "button",
  className: "",
  onClick: () => {}
}