import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import MenuRegister from "../../components/menu-register";
import UserProfile from "../../components/user-profile";
import LayoutAuth from "../../components/layout-auth";

function Profile(props) {
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
      <LayoutAuth title={<h2>Профиль</h2>}>
        <UserProfile/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Profile);