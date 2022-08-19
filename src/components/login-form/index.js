import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function LoginForm({ onLogin, error, t }) {
  const cn = bem("LoginForm");
  // Внутренний стейт логина и пароля
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(login, password);
  };

  return (
    <div className={cn()}>
      <h2>{t("login.title")}</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn("prop")}>
          <label>{t("login.login")}</label>
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className={cn("prop")}>
          <label>{t("login.password")}</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="on"
          />
        </div>
        {error && <div className={cn("prop", { error: true })}>{error}</div>}
        <button type="submit">{t("login.submit")}</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  error: propTypes.string,
  onLogin: propTypes.func.isRequired,
  t: propTypes.func,
};

LoginForm.defaultProps = {
  t: (text) => text,
};

export default React.memo(LoginForm);
