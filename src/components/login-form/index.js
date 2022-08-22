import React, { useState, useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Error from "../../components/form/error";
import "./style.css";

function LoginForm({ submit, t, errors }) {
  // CSS классы по БЭМ
  const cn = bem("LoginForm");

  const [data, setData] = useState({ login: "", password: "" });

  const loginHandler = useCallback(
    (event) => {
      setData({ ...data, login: event.target.value });
    },
    [data]
  );

  const passwordHandler = useCallback(
    (event) => {
      setData({ ...data, password: event.target.value });
    },
    [data]
  );

  const checkAuth = (event) => {
    event.preventDefault();
    submit(data.login, data.password);
  };

  return (
    <>
      <form className={cn()} onSubmit={checkAuth}>
        <h2>{t("login.title")}</h2>
        <div>
          <label className={cn("prop")}>{t("loginForm.login")}</label>
          <input
            value={data.login}
            onChange={loginHandler}
            theme="big"
            type="text"
          />
        </div>
        <div>
          <label className={cn("prop")}>{t("loginForm.password")}</label>
          <input
            value={data.password}
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

LoginForm.propTypes = {
  submit: propTypes.func,
  t: propTypes.func,
  errors: propTypes.arrayOf(propTypes.object),
};

LoginForm.defaultProps = {
  submit: (login, password) => {},
  t: (text) => text,
  errors: [],
};

export default React.memo(LoginForm);
