import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layout";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error_message, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const store = useStore();
  const isLoggedIn = useSelector((state) => state.auth.is_token_valid);

  useEffect(() => {
    if (isLoggedIn) navigate("/profile", { replace: true });
  }, [isLoggedIn]);

  const { t } = useTranslate();

  const login = useCallback(async (user_login, password) => {
    const result_message = await store
      .get("auth")
      .login(user_login, password, () => {
        navigate(-1, { replace: true });
      });
    setErrorMessage(result_message);
  });

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <LoginForm onSubmit={login} error_message={error_message} />
    </Layout>
  );
}

export default Login;
