import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, before}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {before && <div className={cn('before')}>
          {before}
        </div>}
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
  head: propTypes.node,
  children: propTypes.node,
  before: propTypes.node,
}

Layout.defaultProps = {
  before: null
}

export default React.memo(Layout);
