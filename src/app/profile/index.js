import React, { useEffect } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import UserContainer from "../../containers/user-container";
import Auth from "../../containers/auth";
import useSelector from "../../hooks/use-selector";

function Profile() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  useInit(async () => {
    await store.get('profile').loadProfile();
  }, []);

  return (
    <div>
      <Layout 
        auth={
          <LayoutFlex flex='end' padding={false}>
            <Auth />
          </LayoutFlex>}
        head={
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
          </LayoutFlex>
      }>
        <Tools/>
        <UserContainer/>
      </Layout>
    </div>
  )
}

export default React.memo(Profile);
