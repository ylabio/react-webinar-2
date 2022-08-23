import React, { useState, useCallback } from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function FormLogin({onLogin, error, t}) {
  const cn = bem('FormLogin');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onLogin: useCallback((e) => {
      e.preventDefault();
      onLogin({login, password})
    }, [onLogin, login, password])};
    
  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
      <form className={cn()} onSubmit={callbacks.onLogin}>
        <div className={cn('login')}>
          <div>{t('formLogin.username')}</div>
          <input type="text" value={login} onChange={handleLogin}/>
        </div>
        <div className={cn('password')}>
          <div>{t('formLogin.password')}</div>
          <input type="password" value={password} onChange={handlePassword}/>
        </div>
        <div className={cn('error')}>{error}</div>
        <button type="submit" className={cn('btn')}>
          {t('formLogin.login')}
        </button>
      </form>
  )
}

FormLogin.propTypes = {
  t: propTypes.func,
  onLogin: propTypes.func.isRequired,
  error: propTypes.string.isRequired
}

FormLogin.defaultProps = {
  onLogin: () => {},
  t: (text) => text
}

export default React.memo(FormLogin);