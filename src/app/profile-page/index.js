import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from "../../components/profile-card";

function ProfilePage(){

    const {t} = useTranslate();
    const select = useSelector(state => ({
    user: state.user.data,
  }));

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
        <ProfileCard user={select.user}/>
      </Layout>
  )
}
export default React.memo(ProfilePage);
