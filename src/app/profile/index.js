import React from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import UserMenu from '../user-menu';
import { Navigate } from 'react-router-dom';

function Profile() {
  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogged: state.profile.isLogged,
  }));

  const { t } = useTranslate();

  return (
    <Layout
      head={
        <>
          <UserMenu />
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        </>
      }
    >
      <Tools />

      <ProfileCard user={select.user} />

      {!select.isLogged && <Navigate to="/login" />}
    </Layout>
  );
}

export default React.memo(Profile);
