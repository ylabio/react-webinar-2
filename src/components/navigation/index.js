import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <NavLink className={cn()} to={props.path}>{props.title}</NavLink>
  );
}

Navigation.propTypes = {
  path: propTypes.PropTypes.string,
  title: propTypes.PropTypes.string,
};


export default React.memo(Navigation);
