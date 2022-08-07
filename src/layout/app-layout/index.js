import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function AppLayout({head, children}){
  const cn = bem('AppLayout');

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

AppLayout.propTypes = { 
  head: propTypes.node,
  children: propTypes.node,
};

AppLayout.defaultProps = {
};

export default React.memo(AppLayout);
