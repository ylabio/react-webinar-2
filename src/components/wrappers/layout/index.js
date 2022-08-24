import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({ head, children, auth }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {auth && <div className={cn('auth')}>
        {auth}
      </div>}
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
  auth: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
