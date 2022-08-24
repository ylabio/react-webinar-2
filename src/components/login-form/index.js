import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import { Navigate } from 'react-router-dom';

function LoginForm({errorMessage, user, onLogin}){

const cn = bem("LoginForm");
const [login, setLogin] = useState("");
const [pass, setPass] = useState("");
const changeLogin = (e) => {
  setLogin(e.target.value);
};
const changePass = (e) => {
  setPass(e.target.value);
};

const formSubmit = useCallback(e => {
  e.preventDefault();
  onLogin({ login: login, password: pass });
},[login, pass]);

if (user) {
  return <Navigate to="/" />;
}

return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={formSubmit}>
        <label className={cn('label')} htmlFor="login">Логин</label>
        <input className={cn('input')} onChange={changeLogin} value={login} id="login" type="text"/>
        <label className={cn('label')} htmlFor="password">Пароль</label>
        <input className={cn('input')} onChange={changePass} value={pass} id="password" type="password"/>
        {errorMessage && <div className={cn('error')}>{errorMessage}</div>}
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: propTypes.func,
  errorMessage: propTypes.string,
  user: propTypes.object,
};

LoginForm.defaultProps = {
  onLogin: () => {},
}

export default React.memo(LoginForm);
