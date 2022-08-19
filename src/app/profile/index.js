import React from "react";
import { useNavigate } from "react-router-dom";
import AuthControls from "../../components/auth-controls";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import ProfileInfo from "../../components/profile-info";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const navigate = useNavigate();

  const {t} = useTranslate();

  const callbacks = {
    redirect: () => { navigate('/authorization') },
  }

  return(
    <Layout
      control={
        <AuthControls redirect={callbacks.redirect} />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
  }>
    <Tools/>
    <ProfileInfo />
  </Layout>
  )
}

export default React.memo(Profile);
