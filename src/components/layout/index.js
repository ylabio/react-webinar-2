import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, handleAuth, userData, signOut}){
  const cn = bem('Layout');

  console.log(userData)

  return (
    <div className={cn()}>
      {userData 
        ? <div className={cn('login')} onClick={signOut}>
            <span>{userData}</span>
            <button onClick={signOut}>Выход</button>
          </div>
        : <div className={cn('login')}>
            <button onClick={handleAuth}>Вход</button>
          </div>
      }

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
  handleAuth: propTypes.func.isRequired,
  signOut: propTypes.func,
  userData: propTypes.string,
}

Layout.defaultProps = {
  userData: null,
  signOut: () => {},
}

export default React.memo(Layout);
