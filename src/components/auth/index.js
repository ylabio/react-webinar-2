import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

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

export default Auth