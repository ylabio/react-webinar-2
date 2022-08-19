import React from "react"
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Input from "../input";

function AuthForm(props) {
  const cn = bem('AuthForm');

  return (
    <form className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('container')}>
        <label>
          Логин
          <Input></Input>
        </label>
        <label>
          Пароль
          <Input></Input>
        </label>
        <button>Войти</button>
      </div>
    </form>
  )
}

export default React.memo(AuthForm);
