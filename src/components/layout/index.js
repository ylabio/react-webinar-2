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
        {/* <button className={cn('close')} onClick={props.changeLanguage}>RU/ENG</button> */}
        <select onChange={props.changeLanguage} defaultValue={props.lang}>
          <option value='ru'>RU</option>
          <option value='eng'>ENG</option>
        </select>
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
