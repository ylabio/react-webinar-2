import React from "react";
import {Navigate} from "react-router-dom";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginFormContainer from "../../containers/login-form";
import useTranslate from "../../hooks/use-translate";
import HeaderContainer from "../../containers/header/header";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

function Login() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.get('profile').loadUser();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    token: state.profile.token,
  }));

  if (select.token) {
    return <Navigate to="/" replace={true}/>
  }

  return (
    <Layout
      topHead={<HeaderContainer/>}
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }
    >
      <Tools/>
      <LayoutFlex flex="start">
        <LoginFormContainer/>
      </LayoutFlex>
    </Layout>
  )
}

export default React.memo(Login);
