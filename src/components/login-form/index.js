import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ error, onAuth, t }) {
  const cn = bem("LoginAuth");

  const callbacks = {
    onAuthButton: useCallback((e) => {
      e.preventDefault();
      onAuth(e.target[0].value, e.target[1].value), [onAuth];
    }),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onAuthButton}>
      <div className={cn("head")}>{t("log.in")}</div>
      <div className={cn("form_data")}>
        <div className={cn("label")}>{t("login")}</div>
        <input type={"text"} className={cn("input")} />
      </div>
      <div className={cn("form_data")}>
        <div className={cn("label")}>{t("password")}</div>
        <input type={"password"} className={cn("input")} />
      </div>
      {error && <div className={cn("error")}>Ошибка авторизации: {error}</div>}
      <input className={cn("actions")} type="submit" value={t("enter")} />
    </form>
  );
}

LoginForm.propTypes = {
  onAuth: propTypes.func.isRequired,
  error: propTypes.string,
  t: propTypes.func.isRequired,
};

LoginForm.defaultProps = {
  error: "",
};

export default React.memo(LoginForm);
