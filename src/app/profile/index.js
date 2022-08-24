import React from "react";
import ProfileForm from "../../components/forms/profile-form";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import UserBar from "../../containers/user-bar";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useUser from "../../hooks/use-user";

function Profile() {
  const { t } = useTranslate();
  const { waiting } = useUser({ orRedirectTo: '/login' });

  const { userData, customData } = useSelector(state => ({
    userData: state.profile.userData,
    customData: state.profile.customData
  }));

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      top={
        <UserBar />
      }>
      <Tools />
      <Spinner active={waiting}>
        {userData ? <ProfileForm fields={userData} t={t} /> : null}
      </Spinner>
    </Layout>
  )
};

export default React.memo(Profile);
