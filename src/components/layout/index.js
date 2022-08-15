import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h1 className={cn('title')}>
          {props.title}
        </h1>
        <button className={cn('close')} onClick={props.changeLanguage}>RU/ENG</button>
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
  changeLanguage: propTypes.func.isRequired
}

Layout.defaultProps = {
}

export default React.memo(Layout);
