import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Error({text}){
  return (
    <span className='Error'>{text}</span>
  )
}

Error.propTypes = {
  text: propTypes.string.isRequired,
}

export default React.memo(Error);
