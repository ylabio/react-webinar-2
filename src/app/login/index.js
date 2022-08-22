import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import HeaderLogin from "../../components/header-login";
import Tools from "../../containers/tools";

function Login() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if(token && !user.logined) store.get('user').auth(token);
  }, [])

  useEffect(() => {
    if(user.logined) {
      navigate("/user");
    }
  }, [user.logined])

  const logout = useCallback(() => store.get('user').logOut(user))

  const {t} = useTranslate();

  return (
    <Layout head={
      <>
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
      </>
    }
    login={<HeaderLogin user={user} logout={logout}/>}
    >
      <Tools />
      <LoginForm />
    </Layout>
  )
}

export default React.memo(Login);
