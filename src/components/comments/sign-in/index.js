import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function SignIn(props) {
  const cn = bem('SignIn');

  return (
    <div className={cn()}>
      <p><Link to={props.link} state={{ back: props.pathname }}>{props.signIn}</Link>{props.text}&nbsp;</p>
      {props.children}
    </div>
  );
}

SignIn.propTypes = {
  link: PropTypes.string,
  pathname: PropTypes.string,
  signIn: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node
};

SignIn.defaultProps = {
  link: '/',
  pathname: '/',
  text: '',
};

export default React.memo(SignIn);
