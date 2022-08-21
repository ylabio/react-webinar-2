import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function Authorization(props) {
  const cn = bem('Authorisation');

  const callbacks = {
    logOut: useCallback(() => props.logOut(), [])
  };

  return (
    <div className={cn()}>
      {props.user && 
      <>
        <Link to={props.profileUrl}>
          <p>{props.user}</p>
        </Link>
        <Link to={props.loginUrl}>
          <button onClick={callbacks.logOut}>{props.logout}</button>
        </Link>
      </>}
      {!props.user && <Link to={props.loginUrl}><button>{props.login}</button></Link>}
    </div>
  )
}

Authorization.propTypes = {
  user: propTypes.string,
  login: propTypes.string,
  logout: propTypes.string,
  loginUrl: propTypes.string,
  profileUrl: propTypes.string,
  logOut: propTypes.func.isRequired
}

Authorization.defaultProps = {
  user: 'Имя',
  login: 'Войти',
  logout: 'Выйти',
  loginUrl: '/login',
  profileUrl: '/profile',
  logOut: () => {}
}

export default React.memo(Authorization);
