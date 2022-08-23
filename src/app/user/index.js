import React, { useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import './style.css';

function UserPage() {

  const {t} = useTranslate();
  const cn = bem('UserPage');
  const localStorageUser = JSON.parse(localStorage.user);
  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), loginName: t('login.name'), login: t('login'), logOutTitle: t('logout'), password: t('password') }), [t]),
  }

  const UserInfo = () => (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <div>{'Имя:'} 
          <span className={cn('userinfo')}>
            {` ${localStorageUser.profile.name} ${localStorageUser.profile.surname}`}
          </span>
      </div>
      <div>{'Телефон:'} 
          <span className={cn('userinfo')}>
            {` ${localStorageUser.profile.phone}`}
          </span>
      </div>
      <div>{'Email:'} 
          <span className={cn('userinfo')}>
            {` ${localStorageUser.email}`}
          </span>
      </div>
    </div>
  )
  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu}/>
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

