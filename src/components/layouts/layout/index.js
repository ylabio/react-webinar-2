import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function Layout({head, children, handleAuth, userData, signOut, link}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {userData 
        ? <div className={cn('login')}>
            <Link to={link}><span>{userData}</span></Link>
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
  link: propTypes.string,
}

Layout.defaultProps = {
  userData: null,
  signOut: () => {},
  link: '',
}

export default React.memo(Layout);
