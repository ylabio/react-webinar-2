import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import UserCard from "../../components/user-card";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import './style.css';

function UserPage() {
  const store = useStore();
  const navigate = useNavigate();
  useInit(async () => {
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});

  const user = useSelector(state => state.auth.user || JSON.parse(localStorage.user));

  const callbacks = {
    toLogin: useCallback(() => navigate('/login'), []),
    logOut: useCallback(() => store.get('auth').logOut(), []),
  }
  
  const {t} = useTranslate();
  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), loginName: t('login.name'), login: t('login'), logOutTitle: t('logout'), password: t('password') }), [t]),
  }

  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu} user={user} toLogin={callbacks.toLogin} logOut={callbacks.logOut}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <UserCard user={user} profile={t('profile')}/>
      </Layout>
    </>

  )
}

export default React.memo(UserPage);

