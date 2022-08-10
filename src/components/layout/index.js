import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout({head, btn, className, children}){
  const cn = bem('Layout');

  return (
    <div className={`${cn()} ${className}`}>
      <div className={cn('head')}>
        {head}
        {btn}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  btn: propTypes.node,
  className: propTypes.string,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
