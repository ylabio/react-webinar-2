import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Button({ children, ...props }) {
  return (
    <button className='Button' {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: propTypes.node.isRequired
}

Button.defaultProps = {}

export default React.memo(Button);