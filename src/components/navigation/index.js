import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import {Link} from "react-router-dom";

function Navigation(props){
  const cn = bem('Navigation');

  return (
  <nav className={cn()}>
    <Link className={cn('link')}
          to={props.link}>{props.getTranslation('homeLink') || 'Главная'}</Link>
  </nav>
  )
}

Navigation.propTypes = {
  getTranslation: propTypes.func.isRequired,
  link: propTypes.string.isRequired,
}

export default React.memo(Navigation);
