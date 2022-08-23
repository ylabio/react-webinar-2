import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from '@bem-react/classname'
import propTypes, { string } from "prop-types";
import './style.css';

function LoginLinks({user, profileLink, loginLink, status, onLogout}){
  const cn = bem('LoginLinks');

  const callbacks = {
    onLogoutHandler: useCallback((e) => onLogout(), [onLogout])
  };

  if (status === 'auth') {
    return (
      <div className={cn()}>
        <Link to={profileLink} className={cn('user')}>{user?.profile?.name}</Link>
        <button className={cn('button')} onClick={callbacks.onLogoutHandler}>Выход</button>
      </div>
    )
  } else if (status === 'no_auth') {
    return (
      <div className={cn()}>
        <Link to={loginLink} className={cn('button')}>Вход</Link>
      </div>
    )
  } else {
    return (
      <div className={cn()}></div>
    )
  }
}

LoginLinks.propTypes = {
  status: string,
  user: propTypes.object,
  profileLink: propTypes.string,
  loginLink: propTypes.string,
  onLogout: propTypes.func,
}

LoginLinks.defaultProps = {
  status: 'unknown',
  user: {},
  profileLink: '/profile',
  loginLink: '/login',
  onLogout: () => {},
}

export default React.memo(LoginLinks);
