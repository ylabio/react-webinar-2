import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
          {props.head.map(item => item)}
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.array,
  children: propTypes.node,
}

Layout.defaultProps = {
  head: [],
  children: <div/>
}

export default React.memo(Layout);
