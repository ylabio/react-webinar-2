import React from "react";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useAuth} from "../../hooks/use-auth";

function Profile(){
  const {t} = useTranslate();
  const store = useStore();
  const {token} = useAuth();

  useInit(async () => {
    await store.get('user').getProfileInfo(token);
  }, []);
  const select = useSelector((state) => ({
    profile: state.user.profile
  }));

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <UserInfo profile={select.profile} t={t}/>
    </Layout>
  )
}

export default React.memo(Profile);
