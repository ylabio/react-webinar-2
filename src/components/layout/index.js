import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, openLoginPage}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('login')}>
        <button onClick={openLoginPage}>Вход</button>
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
  openLoginPage: propTypes.func.isRequired,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
