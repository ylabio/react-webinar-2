import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
          {/*<div>*/}
          {/*    <div>*/}
          {/*        <button bsStyle="primary" >EN</button>*/}
          {/*        <button bsStyle="primary">RU</button>*/}
          {/*    </div>*/}

          {/*</div>*/}
      </div>
      <div className={cn('content')}>
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
