import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import Input from "../../components/form-components/input";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm() {
  const store = useStore();
  const { t } = useTranslate();
  const cn = bem("LoginForm");
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.user.error,
    login: state?.user?.user,
  }));

  const callbacks = {
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      const login = e.target.login.value;
      const password = e.target.password.value;

      store.get("user").login(login, password);
    }, []),
  };

  useEffect(() => {
    if (select.login) navigate("/profile");
  }, [select.login]);

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("login")}</h2>
      <form className={cn("form")} onSubmit={callbacks.onSubmit}>
        <label>
          Логин
          <Input name="login" type="login" />
        </label>
        <label>
          Пароль
          <Input name="password" type="password" />
        </label>
        {select.error && (
          <div className={cn("error")}>{select.error.message}</div>
        )}
        <Input type="submit" value="Войти" />
      </form>
    </div>
  );
}

export default LoginForm;
