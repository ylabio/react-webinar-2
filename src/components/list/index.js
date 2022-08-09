import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function List({ children, cn }) {
  return (
    <div className={cn}>{children}</div>
  )
}

List.propTypes = {
  children: propTypes.node.isRequired,
  cn: propTypes.string.isRequired,
}



export default React.memo(List);
