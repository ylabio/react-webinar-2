import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({top, head, children}){

  // CSS классы по БЭМ
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        {top}
      </div>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  top: propTypes.node,
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
  top: '',
  head: '',
  children: '',
}

export default React.memo(Layout);
