import React from "react";
import {Navigate} from "react-router-dom";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginFormContainer from "../../containers/login-form";
import useTranslate from "../../hooks/use-translate";
import HeaderContainer from "../../containers/header/header";
import useSelector from "../../hooks/use-selector";

function Login() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    paths: state.history.history
  }));

  const path = select.paths[select.paths.length - 1] || '/';
  if (select.isAuth) {
    return <Navigate to={path} replace={true}/>
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
