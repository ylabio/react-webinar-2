import React from "react";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";

function Profile(props) {
  
  const {t} = useTranslate();
  const {userName, userEmail, userPhone} = useSelector(state => {
    return {
      userName: state.user.user?.profile?.name,
      userEmail: state.user.user?.email,
      userPhone: state.user.user?.profile?.phone,
    }
  });
  
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <ProfileCard userName={userName} userEmail={userEmail} userPhone={userPhone} t={t}/>
    </Layout>
  )
}

export default React.memo(Profile);
