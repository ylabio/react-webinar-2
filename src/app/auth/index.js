import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Login from "../../containers/auth";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import {getToken} from "../../services/token";

function Auth() {
  const navigate = useNavigate();
  const {t} = useTranslate();

  useEffect(() => {
    if(getToken()) navigate(`/profile`)
  }, [])
    
  return (
    <Layout t={t} name={''} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Login/>
    </Layout>
  )
}

export default React.memo(Auth);
