import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import Entrance from '../entrance';
import Logout from '../logout'

function Layout({head, children, isAuth, userName, logout, initAuth}){
  const cn = bem('Layout');

  return (
    <>
    <div className={cn()}>
    {isAuth
    ? <Logout userName={userName} logout={logout}/>
    : <Entrance initAuth={initAuth}/>}
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
    </>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
