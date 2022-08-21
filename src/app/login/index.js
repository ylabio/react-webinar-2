import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import User from "../../containers/user";

function Login() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    token: state.user.token,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  useEffect(() => {
    // Редирект на страницу профиля, если пользователь авторизирован
    if (select.token) {
      navigate("/profile", { replace: true });
    }
  }, [select.token]);  

  const callbacks = {
    // Функция авторизации
    onLogin: useCallback(
      (login, password) => store.get("user").onLogin(login, password),
      []
    ),
  };

  return (
    <Layout
      before={
        <LayoutFlex flex="end" padding={false}>
          <User />
        </LayoutFlex>
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm onLogin={callbacks.onLogin} error={select.error} t={t} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);
