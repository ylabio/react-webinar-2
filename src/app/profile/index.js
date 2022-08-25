import React from "react";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from "../../components/profile-card";
import LoginMenu from "../../containers/login-menu";

function Profile(){
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.login.user
  }));

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LoginMenu/>
      <ProfileCard user={select.user}/>
    </Layout>
  )
}

export default React.memo(Profile);