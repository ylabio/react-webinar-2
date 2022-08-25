import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import Entrance from '../entrance';
import Logout from '../logout'
import useAuth from '../../hooks/use-auth';

function Layout({head, children}){
  const cn = bem('Layout');

  const {isAuth, username, logout, initAuth} = useAuth()

  return (
    <>
    <div className={cn()}>
    {isAuth
    ? <Logout userName={username} logout={logout}/>
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
