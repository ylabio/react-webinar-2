import React, { useRef } from "react";
import Input from "../input";
import LayoutFlex from "../layout-flex";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ onSubmit, error_message }) {
  const login = useRef();
  const password = useRef();

  const cn = bem("LoginForm");

  const submit = (e) => {
    e.preventDefault();
    onSubmit(login.current.value, password.current.value);
  };

  return (
    <LayoutFlex flex="start">
      <form onSubmit={submit} className={cn()}>
        <h2>Вход</h2>
        <label htmlFor="login">Логин</label>
        <Input
          id={"login"}
          ref={login}
          onChange={() => {}}
          value=""
          theme="margin"
        />
        <label htmlFor="password">Пароль</label>
        <Input
          id={"password"}
          ref={password}
          onChange={() => {}}
          value=""
          theme="margin"
        />
        <div className={cn("errorMessage")}>{error_message}</div>
        <button type="submit">Войти</button>
      </form>
    </LayoutFlex>
  );
}

export default LoginForm;
