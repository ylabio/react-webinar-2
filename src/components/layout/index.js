import React from 'react';
import {Outlet} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import LanguagesControl from '../languages-control';
import './style.css';

function Layout({head, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <LanguagesControl />
      </div>
      <div className={cn('content')}>
        <Outlet />
      </div>
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
