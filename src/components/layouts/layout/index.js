import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, nav, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div>
        {nav}
      </div>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  nav: propTypes.node,
  children: propTypes.node,
}

export default React.memo(Layout);
