import React from 'react';
import {Outlet} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, nav}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
       {head && <div className={cn('head')}>
        {head}
      </div>}
      {<div className={cn('menu')}>
      {children}
      </div>}
      <div className={cn('content')}>
        <Outlet />
      </div>
      {nav}
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
