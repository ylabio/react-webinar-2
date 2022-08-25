import React, { useMemo, useCallback } from "react";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { cn as bem } from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import './style.css';

function UserPage() {
  const cn = bem('UserPage');
  const store = useStore();
  useInit(async () => {
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});

  const user = useSelector(state => state.auth.user || JSON.parse(localStorage.user));

  const callbacks = {
    logOut: useCallback(() => store.get('auth').logOut(), []),
  }
  
  const {t} = useTranslate();
  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), loginName: t('login.name'), login: t('login'), logOutTitle: t('logout'), password: t('password') }), [t]),
  }

  const UserInfo = () => (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <div>{'Имя:'} 
          <span className={cn('userinfo')}>
            {` ${user.profile.name} ${user.profile.surname}`}
          </span>
      </div>
      <div>{'Телефон:'} 
          <span className={cn('userinfo')}>
            {` ${user.profile.phone}`}
          </span>
      </div>
      <div>{'Email:'} 
          <span className={cn('userinfo')}>
            {` ${user.email}`}
          </span>
      </div>
    </div>
  )
  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu} user={user} logOut={callbacks.logOut}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <UserInfo />
      </Layout>
    </>

  )
}

export default React.memo(UserPage);

