import React from 'react';
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Layout({ head, children }) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
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
};

export default React.memo(Layout);
