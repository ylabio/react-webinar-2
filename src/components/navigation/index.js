import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function Navigation(props){
  const cn = bem('Navigation');

  return (
  <nav className={cn()}>
    <a className={cn('link')}
       href="#"
       onClick={props.onClick}>{props.getTranslation('homeLink') || 'Главная'}</a>
  </nav>
  )
}

Navigation.propTypes = {
  onClick: propTypes.func.isRequired,
  getTranslation: propTypes.func.isRequired,
}

export default React.memo(Navigation);
