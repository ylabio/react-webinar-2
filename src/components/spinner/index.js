import React from 'react';
import propTypes from "prop-types";
import './style.css';

function Spinner({ active, children }) {
  return active ? (
    <div className='spinner'>
      <div className='spinner__blur'/>
      {children}
    </div>
  ) : (
    <>{children}</>
  )
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: propTypes.node,
}

export default React.memo(Spinner);
