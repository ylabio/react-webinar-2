import React, {useCallback, useRef} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LoginForm({errorMessage, onLogin}){

  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const cn = bem('LoginForm');

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    onLogin({login: loginRef.current.value, password: passwordRef.current.value});
  }, [])

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={onFormSubmit}>
        <label className={cn('label')} htmlFor="login">Логин</label>
        <input className={cn('input')} ref={loginRef} id="login" type="text"/>
        <label className={cn('label')} htmlFor="password">Пароль</label>
        <input className={cn('input')} ref={passwordRef} id="password" type="password"/>
        {errorMessage && <div className={cn('error')}>{errorMessage}</div>}
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: propTypes.func,
  errorMessage: propTypes.string
}

LoginForm.defaultProps = {
  onLogin: () => {}
}

export default React.memo(LoginForm);