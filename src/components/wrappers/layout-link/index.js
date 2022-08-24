import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function LayoutLink({ children }) {
  return (
    <div className='LayoutLink'>{children}</div>
  )
}

LayoutLink.propTypes = {
  children: propTypes.node.isRequired
}

export default React.memo(LayoutLink);