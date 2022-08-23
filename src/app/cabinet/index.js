import React, {useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Auth from "../../containers/auth";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import Profile from "../../containers/profile";
import {useNavigate} from "react-router-dom";

function Cabinet(){
  const {t} = useTranslate();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!localStorage.getItem('token')) navigate('/login');
  })

  return (
   <Layout auth={<Auth />}
    head={<LayoutFlex flex="between">
      <h1>{t('title')}</h1>
      <LocaleSelect/>
    </LayoutFlex>
    }>
      <Tools/>
      <Profile/>
    </Layout>
  )
}

export default React.memo(Cabinet);