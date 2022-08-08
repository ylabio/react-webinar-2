import React from 'react';
import './style.css';
import propTypes from "prop-types";

function Layout({head, children}){

  return (
    <div className='Layout'>
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
