import React, { useState, useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Input from "../input";
import Error from "../../components/error";
import "./style.css";

function LoginForm({ submit, t, errors }) {
  // CSS классы по БЭМ
  const cn = bem("LoginForm");

  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");

  const loginHandler = useCallback(
    (event) => {
      setLogin(event.target.value);
    },
    [setLogin]
  );

  const passwordHandler = useCallback(
    (event) => {
      setpassword(event.target.value);
    },
    [setpassword]
  );

  const checkAuth = (event) => {
    event.preventDefault();
    submit(login, password);
  };

  return (
    <>
      <form className={cn()} onSubmit={checkAuth}>
        <h2>{t("login.title")}</h2>
        <div>
          <label className={cn("prop")}>Логин</label>
          <input
            value={login}
            onChange={loginHandler}
            theme="big"
            type="text"
          />
        </div>
        <div>
          <label className={cn("prop")}>Пароль</label>
          <input
            value={password}
            onChange={passwordHandler}
            theme="big"
            type="password"
          />
        </div>
        {errors && <Error errors={errors} />}
        <button type="submit" className={cn("sigin")}>
          {t("login.enter")}
        </button>
      </form>
    </>
  );
}

export default React.memo(LoginForm);
