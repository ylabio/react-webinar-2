import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import { Link } from 'react-router-dom'

function Auth({ auth, userName, logOut }) {
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
      <Link to={'/login'}>
        {auth ? (
          <button onClick={callbacks.logOut}>Выход</button>
        ) : (
          <button onClick={() => {}}>Вход</button>
        )}
      </Link>
    </div>
  )
}

Auth.propTypes = {}

Auth.defaultProps = {}

export default React.memo(Auth)
