import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {props.head}
        {props.setLang && <button className={cn('langBtn')} onClick={props.setLang}>{props.lang}</button>}
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  setLang: propTypes.func,
  lang: propTypes.string,
  children: propTypes.node,
}

Layout.defaultProps = {
  head: <h1>Заголовок</h1>,
  setLang: null,
  lang: ""
}

export default React.memo(Layout);
