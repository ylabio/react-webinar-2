import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import LanguageSwitch from '../language-switch';

function Layout({head, children, changeLanguage}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div>{head}</div>
        <div className={cn('language-switch')}>
          <LanguageSwitch changeLanguage={changeLanguage}/>
        </div>
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
  changeLanguage: propTypes.func.isRequired
}

export default React.memo(Layout);
