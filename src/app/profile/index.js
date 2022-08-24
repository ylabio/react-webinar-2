import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from "../../components/profile-card";
import AuthContainer from "../../containers/auth-container";
import LayoutLogin from "../../components/layout-login";

function Profile(){

  const select = useSelector(state => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting
  }));
  
  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
      }
            login={
      <LayoutLogin>
        <AuthContainer/>
      </LayoutLogin>
      }
    >
      <Tools/>
      { 
        select.isAuth ? <Spinner active={select.waiting}><ProfileCard user={select.user} t={t} /></Spinner> : null
      }
    </Layout>
  )
}

export default React.memo(Profile);
