import React from "react";
import ProfilePage from "../../components/profile-page";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';
import TopContainer from "../../containers/top-container";

function Profile() {
  const {t} = useTranslate();
  const { user } = useSelector(state => state.auth);

  return (
    <Layout 
      top={<TopContainer />}
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
        </LayoutFlex>}
    >
      <Tools />
      <ProfilePage userData={user} />
    </Layout>
  );
}

export default React.memo(Profile);