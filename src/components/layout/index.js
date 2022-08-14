import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import Language from '../language'
import './style.css';

function Layout({head, children, setLang, change}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        <Language setLang={setLang} change={change}/>
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
  setLang: propTypes.func.isRequired,
  change: propTypes.string.isRequired
}

Layout.defaultProps = {
  setLang: () => {}
}

export default React.memo(Layout);
