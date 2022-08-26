import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import { Link } from 'react-router-dom'

function Auth({ auth, userName, logOut, t }) {
  // CSS классы по БЭМ
  const cn = bem('Auth')

  const callbacks = {
    logOut: useCallback(() => {
      logOut()
    }, []),
  }

  return (
    <div className={cn()}>
      {auth ? <Link to={'/profile'}>{userName}</Link> : ''}

      {auth ? (
        <button onClick={callbacks.logOut}>{t('auth.logout')}</button>
      ) : (
        <Link to={'/login'}>
          <button onClick={() => {}}>{t('auth.login')}</button>
        </Link>
      )}
    </div>
  )
}

Auth.propTypes = {
  auth: propTypes.bool,
  userName: propTypes.string,
  logOut: propTypes.func,
  t: propTypes.func,
}

Auth.defaultProps = {}

export default React.memo(Auth)
