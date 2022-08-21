import React, { useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContainer from "../../containers/auth-container";
import AuthHeader from "../../containers/auth-header";
import { useAuth } from "../../hooks/use-auth";


function LogIn() {
  const navigate = useNavigate();
  const {isAuth, token} = useAuth();

  const from = localStorage.getItem('link') || '/';

  useEffect(()=> {
    {isAuth || token ? navigate(from): navigate('/login')}
  },[isAuth,from]);

  const {t} = useTranslate();

  return (
    <Layout userInfo={<AuthHeader />}  head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
			<AuthContainer/>
    </Layout>
  )
}

export default React.memo(LogIn);
