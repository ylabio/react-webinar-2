import React from "react";
import useSelector from "../../hooks/use-selector";
import Layout from "../../components/layout";
import {Navigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Spinner from "../../components/spinner";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from "../../components/profile-info";
import HeaderInfo from "../../containers/header-info";

function Profile() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.login.user,
    waiting: state.login.waiting,
    isLoggedIn: state.login.isLoggedIn
  }));


  if (!select.isLoggedIn) {
    return <Navigate to='/login'/>
  }

  return (<>
    <HeaderInfo/>
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LayoutFlex flex={'start'}>
        <ProfileInfo email={select.user.email} name={select.user.profile.name} phone={select.user.profile.phone}/>
        </LayoutFlex>
      </Spinner>
    </Layout>
    </>
  )
}

export default React.memo(Profile);
