import React from 'react';
import './style.css';
import propTypes from "prop-types";

function Layout({head, option, children}){

  return (
    <div className={option ? `Layout-${option}` : 'Layout'}>
      <div className='Layout-head'>
        {head}
      </div>
      <div className='Layout-content'>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
