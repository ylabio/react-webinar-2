import React from 'react';
import {Outlet} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import LanguagesControl from '../languages-control';
import './style.css';

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {props.head}
        <LanguagesControl setLang={props.setLang}/>
      </div>
      <div className={cn('content')}>
        <Outlet />
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  setLang: propTypes.func
}

Layout.defaultProps = {
  setLang: () => {}
}

export default React.memo(Layout);
