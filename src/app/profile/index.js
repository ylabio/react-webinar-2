import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import UserProfile from "../../components/user-profile";
import LayoutAuth from "../../components/layout-auth";
import { Navigate } from "react-router-dom";

function Profile() {
  const store = useStore();

  useInit(async () => {
    await store.get('authorization').loadUser();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    token: state.authorization.token,
    user: state.authorization.userData,
  }));

  const {t} = useTranslate();

  if (!select.token) {
   return <Navigate to="/login" replace={true} />
  }
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>} 
      topHead={ 
        <TopHead/>
      }>
      <Tools/>
      <LayoutAuth title={<h2>{t('filter')}</h2>}>
        <UserProfile user={select.user}/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Profile);