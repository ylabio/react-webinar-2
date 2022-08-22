import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import propTypes from 'prop-types';

function Auth({t, toLogin, username, logOut, toProfile}) {
  const callbacks = {
    toLogin: useCallback(() => toLogin(), [toLogin]),
    logOut: useCallback(() => logOut(), [logOut]),
  }

  return (
    <div className='Auth'>
      {
        username 
        ? <>
            <Link to={toProfile}>{username}</Link>
            <button onClick={callbacks.logOut}>{t('auth.logout')}</button>
          </>
        : <button onClick={callbacks.toLogin}>{t('auth.login')}</button>
      }
    </div>
  )
}

Auth.propTypes = {
  t: propTypes.func,
  toLogin: propTypes.func,
  logOut: propTypes.func,
  toProfile: propTypes.string,
  username: propTypes.string
}

Auth.defaultProps = {

}

export default React.memo(Auth);