import React, { useCallback } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');

  const callbacks = {
    login: useCallback((e) => {
      e.preventDefault();
      props.loginFetch(props.login, props.password);
    }, [props.login, props.password])
  };

  return (
    <form className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('fields')}>
        <label className={cn('label')}>
          Логин
          <input
            type='text'
            className={cn('input')}
            value={props.login}
            onChange={(e) => props.setLoginForm({ password: props.password, login: e.target.value })}>
          </input>
        </label>
        <label className={cn('label')}>
          Пароль
          <input
            type='password'
            className={cn('input')}
            value={props.password}
            onChange={(e) => props.setLoginForm({ login: props.login, password: e.target.value })}>
          </input>
        </label>
        {props.error && <div className={cn('error')}>{props.error}</div>}
        <button className={cn('button')} onClick={callbacks.login}>Войти</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  login: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  setLoginForm: propTypes.func,
  loginFetch: propTypes.func
}

LoginForm.defaultProps = {
  setLoginForm: () => { },
  loginFetch: () => { },
}

export default React.memo(LoginForm);