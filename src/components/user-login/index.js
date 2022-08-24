import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserLogin(props) {
  
  const cn = bem('UserLogin');

  let login = '';
  let password = '';

  const callbacks = {
    onLogin: useCallback((e) => props.onLogin(e, login, password), [props.error, props.user])
  };

  return(
    <form className={cn()} onSubmit={callbacks.onLogin}>
      <p className={cn('text__bold')}>{props.in}</p>
      <label htmlFor="login" className={cn('text')}>{props.login}</label>
      <input type="text" id="login" onInput={(e) => {login = e.target.value;}}></input>
      <label htmlFor="password" className={cn('text')}>{props.pass}</label>
      <input type="password" id="password"onInput={(e) => {password = e.target.value;}}></input>
      {props.error && <p className={cn('text_disappear')}>
        {props.error}
      </p>}
      <button type="submit">{props.inButton}</button>
    </form>
  )
}

UserLogin.propTypes = {
    in: propTypes.string,
    login: propTypes.string,
    pass: propTypes.string,
    error: propTypes.string.isRequired,
    inButton: propTypes.string,
    onLogin: propTypes.func.isRequired,
}

UserLogin.defaultProps = {
    in: 'Вход',
    login: 'Логин',
    pass: 'Пароль',
    inButton: 'Войти',
    onLogin: () => {}
}    

export default React.memo(UserLogin);
