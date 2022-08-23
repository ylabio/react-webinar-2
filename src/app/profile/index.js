import React from "react";
import {useNavigate} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import {useAuth} from "../../hooks/use-auth";

function Profile(){
  const {t} = useTranslate();
  const {user, isAuth} = useAuth();
  const navigate = useNavigate();

  useInit(async () => {
    isAuth ? navigate('/profile') : navigate('/login');
  }, [isAuth], {backForward: true});

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <UserInfo user={user} t={t}/>
    </Layout>
  )
}

export default React.memo(Profile);
