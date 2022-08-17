import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function ErrorMessage(props) {
  return (
    <div className="ErrorMessage">
      {props.message}
    </div>
  )
}
  
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired
}
  
export default React.memo(ErrorMessage);