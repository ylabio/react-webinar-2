import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import HeaderLogin from "../../components/header-login";
import Tools from "../../containers/tools";
import useAuth from "../../hooks/use-auth";

function Login() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams({}, false);
  }, [], {backForward: true});

  let profile = useSelector((state) => state.profile.profile);
  let user = useSelector((state) => state.user);

  useAuth();

  useEffect(() => {
    if(user.logined) {
      history.back()
    }
  }, [user.logined])

  const logout = useCallback(() => store.get('user').logOut(user));

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
    login={<HeaderLogin profile={profile} user={user} logout={logout}/>}
    >
      <Tools />
      <LoginForm />
    </Layout>
  )
}

export default React.memo(Login);
