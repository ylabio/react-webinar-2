import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import HeaderContainer from "../../containers/header/header";
import useSelector from "../../hooks/use-selector";
import {Navigate} from "react-router-dom";
import ProfileContainer from "../../containers/profile";

function Profile() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.get('profile').loadUser();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    token: state.profile.token
  }));

  if (!select.token) {
    return <Navigate to="/login" replace={true}/>
  }

  return (
    <Layout
      topHead={<HeaderContainer/>}
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
      <Tools/>
      <LayoutFlex flex="start">
        <ProfileContainer/>
      </LayoutFlex>
    </Layout>
  )
}

export default React.memo(Profile);
