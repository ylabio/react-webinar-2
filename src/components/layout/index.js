import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {props.auth ? <div className={cn('upper-head')}>{props.auth}</div> : null}
      <div className={cn('head')}>
        {props.head}
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  auth: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
