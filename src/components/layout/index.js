import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import Switch from '../switch';
import './style.css';

function Layout({head, children, setLanguage, lang}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <Switch setLanguage={setLanguage} lang={lang} />
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
  setLanguage: propTypes.func,
  lang: propTypes.string
}

Layout.defaultProps = {
  setLanguage: ()=>{},
  lang: 'ru'
}

export default React.memo(Layout);
