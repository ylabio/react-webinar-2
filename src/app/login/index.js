import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import MenuRegister from "../../components/menu-register";
import FormLogin from "../../components/form-login";
import LayoutAuth from "../../components/layout-auth";

function Login(props) {
  const store = useStore();

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } topHead={ <MenuRegister link={'/login'}/>}>
      <Tools/>
      <LayoutAuth title={<h2>Вход</h2>}>
        <FormLogin link={'/profile'}/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Login);