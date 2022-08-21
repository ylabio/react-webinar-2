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

  return (
    <div className={cn()}>
    {status ===  'auth' ?
      <>
        <Link to={profileLink} className={cn('user')}>{user?.profile.name}</Link>
        <button className={cn('button')} onClick={callbacks.onLogoutHandler}>Выход</button>
      </> :
      <Link to={loginLink} className={cn('button')}>Вход</Link> 
    }
    </div>
  )
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
