import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import SelectLang from '../lang-select/select-lang';

function Layout({head, children, ChangeLang}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head} <SelectLang ChangeLang={ChangeLang}/>
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
  ChangeLang:propTypes.func
}

Layout.defaultProps = {
}

export default React.memo(Layout);
