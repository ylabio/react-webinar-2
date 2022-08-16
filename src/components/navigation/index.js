import React from 'react';
import propTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import './styles.css';
import {cn as bem} from "@bem-react/classname";

function Navigation(props) {
  const cn = bem('Navigation');
  return <div className={cn()}>
    <NavLink to={`/${props.page ? props.page : 1}`}>Главная</NavLink>
  </div>

}

Navigation.propTypes = {
  page: propTypes.number
}

Navigation.defaultProps = {
  page: 1,
}

export default React.memo(Navigation);
