import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutAuth({title, children}){
  const cn = bem('LayoutAuth');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {title}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

LayoutAuth.propTypes = {
  title: propTypes.node,
  children: propTypes.node,
}

export default React.memo(LayoutAuth);
