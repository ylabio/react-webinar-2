import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({nav, head, basket, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('nav')}>
        {nav}
        {basket}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  basket: propTypes.node,
  nav: propTypes.node.isRequired,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
