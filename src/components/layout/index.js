import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout({head, btn, children, className}){
  const cn = bem('Layout');

  const ClassN = `${cn()} ${className}`

  return (
    <div className={ClassN}>
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
  children: propTypes.node,
  className: propTypes.string,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
