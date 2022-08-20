import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function LoginLink(props) {
  const cn = bem('Login');

  return (
    <Link to={props.link} className={cn()}>
      <button>{props.lableButton}</button>
    </Link>
  );
}

LoginLink.propTypes = {
  link: propTypes.string,
  lableButton: propTypes.string,
};

LoginLink.defaultProps = {};

export default React.memo(LoginLink);
