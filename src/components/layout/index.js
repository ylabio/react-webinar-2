import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, right}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div>{head}</div>
        <div className={cn('right')}>{right}</div>
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
  right: propTypes.node
}

export default React.memo(Layout);
