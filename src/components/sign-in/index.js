import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "../../hooks/use-translate";

function SignIn({ onSubmit, onChange, login, password, error }) {
  const { t } = useTranslate();
  const cn = bem("SignIn");

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2>{t("user.signIn")}</h2>
      <label className={cn("label")}>
        {t("user.login")}
        <input onChange={onChange} value={login} name="login" />
      </label>
      <label className={cn("label")}>
        {t("user.password")}
        <input onChange={onChange} value={password} name="password" type="password" />
      </label>
      <span className={cn("error")}>{error}</span>
      <button>{t("user.submit")}</button>
    </form>
  );
}

export default React.memo(SignIn);
