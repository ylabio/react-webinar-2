import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import LoginForm from "../../components/login-form";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import LoginFormContainer from "../../containers/login-form-container";

function Login() {

  const { t } = useTranslate();

  return (
    <div>
      <Layout 
        auth={
          <LayoutFlex flex='end' padding={false}>
            <Auth />
          </LayoutFlex>}
        head={
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
          </LayoutFlex>
        }>
        <Tools/>
        <LoginFormContainer />
      </Layout>
    </div>
  )
}

export default React.memo(Login);
