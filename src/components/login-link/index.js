import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname'
import propTypes from "prop-types";
import './style.css';

function LoginLink(props){
  const cn = bem('LoginLink');

  return (
    <Link to={props.link} className={cn('')}>Вход</Link>
  )
}

LoginLink.propTypes = {
  link: propTypes.string
}

LoginLink.defaultProps = {
  link: '/login'
}

export default React.memo(LoginLink);