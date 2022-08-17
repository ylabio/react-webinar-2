import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Wrapper({children }){
  return <div className='Wrapper'>{children}</div>;
}

Wrapper.propTypes = {
  children: propTypes.node
}

export default React.memo(Wrapper);