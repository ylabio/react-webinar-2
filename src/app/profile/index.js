import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import {useAuth} from "../../hooks/use-auth";
import LoginBar from "../../components/login-bar";

function Profile(){
  const {t} = useTranslate();
  const store = useStore();
  const {user, isAuth} = useAuth();
  const navigate = useNavigate();

  const callbacks = {
    logOut: useCallback(() => store.get('user').logOut(), []),
  };

  useInit(async () => {
    await store.get('user').restore();
    isAuth ? navigate('/profile') : navigate('/login');
  }, [isAuth], {backForward: true});

  return (
    <>
      <LoginBar userName={user.username} logOut={callbacks.logOut} t={t}/>
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
        <Tools/>
        <UserInfo user={user} t={t}/>
      </Layout>
    </>
  )
}

export default React.memo(Profile);
