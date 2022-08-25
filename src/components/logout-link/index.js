import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function LogoutLink(props) {
  const cn = bem('LogoutLink');

  const logOut = () => {
    props.onOut(localStorage.getItem('token'));
  };

  return (
    <div className={cn()}>
      <Link to={props.link}>{props.userName}</Link>
      <button onClick={logOut}>{props.lableButton}</button>
    </div>
  );
}

LogoutLink.propTypes = {
  onOut: propTypes.func,
  userName: propTypes.string,
  link: propTypes.string,
  lableButton: propTypes.string,
};

LogoutLink.defaultProps = {
  onOut: () => {},
};

export default React.memo(LogoutLink);
