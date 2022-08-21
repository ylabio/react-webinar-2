import React, { useState, useCallback } from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function FormLogin(props) {
  const cn = bem('FormLogin');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onLogin: useCallback((e) => {
      e.preventDefault();
      console.log('obj',{login, password})
      props.onLogin({login, password})
    }, [props.onLogin, login, password])};
    
  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
      <form className={cn()} onSubmit={callbacks.onLogin}>
        <div className={cn('login')}>
          <div>Логин</div>
          <input type="text" value={login} onChange={handleLogin}/>
        </div>
        <div className={cn('password')}>
          <div>Пароль</div>
          <input type="text" value={password} onChange={handlePassword}/>
        </div>
        <div className={cn('error')}>{props.error}</div>
        <button type="submit" className={cn('btn')}>
          Войти
        </button>
      </form>
  )
}

FormLogin.propTypes = {
  onLogin: propTypes.func.isRequired,
  error: propTypes.string.isRequired
}

FormLogin.defaultProps = {
  onLogin: () => {}
}

export default React.memo(FormLogin);