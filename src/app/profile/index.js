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

function Profile() {
  const store = useStore();

  useInit(async () => {
    await store.get('profile').loadUser();
  }, []);

  const select = useSelector(state => ({
    token: state.authorization.token,
    user: state.profile.userData,
  }));
 
  const {t} = useTranslate();

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
      <LayoutAuth title={<h2>{t('profile')}</h2>}>
        <UserProfile user={select.user} t={t}/>
      </LayoutAuth>
    </Layout>
  )
}


export default React.memo(Profile);