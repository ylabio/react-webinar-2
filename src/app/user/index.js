import React, { useState, useContext, useMemo } from "react";
import { useParams } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import { AuthContext } from "../../store/authcontext";

function UserPage() {

    const {t} = useTranslate();

    const localStorageUser = localStorage.user && JSON.parse(localStorage.user);
    const options = {
        loginMenu: useMemo(() => ({ loginTitle: t('tologin'), loginName: t('login.name'), login: t('login'), logOutTitle: t('logout'), password: t('password') }), [t]),
    }

  const UserInfo = () => (
    <div>
        <div>{`Имя: ${localStorageUser.profile.name} ${localStorageUser.profile.surname}`}</div>
        <div>{`Телефон: ${localStorageUser.profile.phone}`}</div>
        <div>{`Email: ${localStorageUser.email}`}</div>
    </div>
  )
  return (
    <>
      
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu}/>
          <LayoutFlex flex="between">
            <h1>{t('profile')}</h1>
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

