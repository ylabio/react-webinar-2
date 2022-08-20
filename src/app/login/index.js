import React, { useEffect } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../containers/auth-container";
import AuthHeader from "../../containers/auth-header";
import { useAuth } from "../../hooks/use-auth";


function LogIn() {
  const store = useStore();
  const navigate = useNavigate();
  const {isAuth, token} = useAuth();

  useEffect(()=> {
    {isAuth || token ? navigate('/'): navigate('/login')}
  },[isAuth]);

  const {t} = useTranslate();

  return (
    <Layout userInfo={<AuthHeader/>}  head={
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
