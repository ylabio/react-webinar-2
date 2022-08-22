import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Login(props) {
  const cn = bem("Login");

  const callbacks = {
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        props.onSubmit(props.login, props.password);
      },
      [props.onSubmit, props.login, props.password]
    ),
  };

  return (
    <div className={cn()}>
      <p className={cn("welcome")}>Вход</p>
      <form onSubmit={callbacks.onSubmit} className={cn("form")}>
        <label htmlFor="login" className={cn("form-label")}>
          Логин
          <input
            required
            name="login"
            type="text"
            value={props.login}
            onChange={props.onHandleLoginChange}
            className={cn("form-input")}
          />
        </label>
        <label htmlFor="password" className={cn("form-label")}>
          Пароль
          <input
            required
            name="password"
            type="password"
            value={props.password}
            onChange={props.onHandlePasswordChange}
            className={cn("form-input")}
          />
        </label>
        <span className={cn("error")}>{props.error}</span>
        <div className={cn("button-container")}>
          <button
            type="submit"
            onSubmit={callbacks.onSubmit}
            className={cn("button")}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Login);
