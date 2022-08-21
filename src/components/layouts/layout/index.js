import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import LoginLogout from '../../../containers/login-logout';

function Layout({head, authorization, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('login')}>
        <LoginLogout/>
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
  authorization: propTypes.node
}

Layout.defaultProps = {
}

export default React.memo(Layout);
