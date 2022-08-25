import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Login from "../../app/login";
import ProfilePage from "../../components/profile-page";


function Profile() {

  const select = useSelector(state => ({
    user: state.profile.data,
    authorized: state.user.authorized,
    waiting: state.user.waiting
  }));

  const {t} = useTranslate();

  if (select.user.profile) {
    return (
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
        <Tools/>
        <Spinner active={select.waiting}>
          <ProfilePage t={t} user={select.user}/>
        </Spinner>
      </Layout>
    )
  } else {
    return <Login/>
  }
}

export default React.memo(Profile);
