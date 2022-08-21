import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, top}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        {top}
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
  children: propTypes.node,
  top: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
