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

function Profile(props) {
  const store = useStore();

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } top={ <MenuRegister link={'/login'}/>}>
      <Tools/>
      <UserProfile/>
    </Layout>
  )
}


export default React.memo(Profile);