import React from "react";
import propTypes from "prop-types";
import './style.css';

function Container({ children }) {
  return (
    <div className='Container'>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: propTypes.node,
}

export default React.memo(Container);
