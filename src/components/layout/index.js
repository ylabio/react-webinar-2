import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Layout({head, content, children}){

  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

export default Layout;
