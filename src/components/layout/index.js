import React from 'react';
import {cn as bem} from "@bem-react/classname";
import BtnAuth from "../btnAuth";
import propTypes from "prop-types";
import './style.css';

function Layout({t, name, removeToken, head, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <BtnAuth t={t} name={name} removeToken={removeToken}/>
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
  name: propTypes.string,
  t: propTypes.func,
  removeToken: propTypes.func
}

Layout.defaultProps = {
}

export default React.memo(Layout);
