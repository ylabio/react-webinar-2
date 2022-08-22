import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import useTranslate from '../../hooks/use-translate'

function LoginForm(props) {
  // CSS классы по БЭМ
  const cn = bem('LoginForm')

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const callbacks = {
    setLogin: useCallback((e) => setLogin(e.target.value), []),
    setPassword: useCallback((e) => setPassword(e.target.value), []),
    enter: useCallback(
      (e) => {
        e.preventDefault()
        props.login(login, password)
        setLogin('')
        setPassword('')
      },
      [login, password]
    ),
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')}>
        <span>логин</span>
        <div className={cn('input')}>
          <input type='text' value={login} onChange={callbacks.setLogin} />
        </div>
        <span>пароль</span>
        <div className={cn('input')}>
          <input type='password' value={password} onChange={callbacks.setPassword} />
        </div>
        {props.error && <div style={{ color: 'red', padding: 10 }}>{props.error}</div>}
        <div className={cn('button')}>
          <button onClick={callbacks.enter}> Войти</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {}

LoginForm.defaultProps = {}

export default React.memo(LoginForm)
