import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={props.buttonTitle === "Закрыть" ?  cn("modal") : cn()}>
      <div className={props.buttonTitle === "Закрыть" ? cn("header") : cn('head')}>
        {props.head}
          {props.buttonTitle ? (<button type="button" onClick={props.onClose} className={cn('btn')}>{props.buttonTitle}</button>) : ""}
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
}

Layout.defaultProps = {
}

export default React.memo(Layout);
