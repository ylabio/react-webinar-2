import React, { useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
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

  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    waiting: state.auth.waiting
  }));

  const navigate = useNavigate()
  
  const {t} = useTranslate();

  useInit(async () => {
    
    await store.get('auth').load();
   
  }, [select.token]);

useEffect(() => {
  if(!select.token){
    navigate('/login');
  }
}, [select.token])

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
