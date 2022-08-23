import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import UserDetails from '../../components/user-details';
import LocaleSelect from '../../containers/locale-select';
import LoginPanel from '../../containers/login-panel';
import Tools from '../../containers/tools';
import useAuth from '../../hooks/use-auth';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

const Profile = () => {
  const { t } = useTranslate();
  const store = useStore();
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  useInit(
    async () => {
      await store.get('user').checkAuth();
      isAuth ? navigate('/profile') : navigate('/login');
    },
    [isAuth],
    { backForward: true }
  );

  return (
    <Layout
      loginPanel={<LoginPanel />}
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <UserDetails user={user} />
    </Layout>
  );
};

export default Profile;
