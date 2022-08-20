import React, { useCallback } from "react";

import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../layout/index";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import LayoutProfile from "../layout-profile";

import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Login = () => {
  const { t } = useTranslate();
  const cn = bem("Login");

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const store = useStore();

  const select = useSelector((state) => ({
    error: state.user.error,
    user: state.user,
  }));

  const callbacks = {
    signIn: useCallback(() => {
      store.get("user").authorization(login, password);
    }, [login, password]),
  };

  return (
    <Layout
      header={<Header />}
      head={
        <LayoutFlex flex="between" padding="20">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />

      <LayoutProfile head={<h2>Вход</h2>}>
        <div className={cn()}>
          <div className={cn("data")}>Логин</div>
          <div className={cn("input")}>
            <input onChange={(e) => setLogin(e.target.value)} type="text" />
          </div>
          <div className={cn("data")}>Пароль</div>
          <div className={cn("input")}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          {select.error && <div className={cn("error")}>{select.error}</div>}
          <div>
            <button onClick={callbacks.signIn}>Войти</button>
          </div>
        </div>
      </LayoutProfile>
    </Layout>
  );
};

export default React.memo(Login);
