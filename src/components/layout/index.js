import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, langSwitch, children}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div className={cn('head-title')}>{head}</div>
        <div className={cn('head-language-switch')}>{langSwitch}</div>
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
}

export default React.memo(Layout);
