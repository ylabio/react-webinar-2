import React from "react";
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function LoginLayout(props){
  const cn=bem('LoginLayout');

  return (
    <div className={cn()}>
      <div className={cn('Body')}>
        <h2>Вход</h2>
        <p>Логин</p>
        <input value={props.login} onChange={props.onLogin}/>
        <p>Пароль</p>
        <input type="password" value={props.password} onChange={props.onPassword}/> 
      </div>
    {props.error && <div className={cn('Error')}>
      {'Ошибка:  ' + props.error}
    </div>}
    <button onClick={props.onButtonClick}>Войти</button>
  </div>
  )
}

export default React.memo(LoginLayout);