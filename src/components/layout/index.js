import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import Language from '../language';

function Layout({head, children, language, changeLanguage}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <Language language={language} changeLanguage={changeLanguage}/>
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
  language: propTypes.string.isRequired,
  changeLanguage: propTypes.func.isRequired,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
