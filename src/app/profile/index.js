import React from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import UserMenu from '../user-menu';
import { Navigate, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';

function Profile() {
  const store = useStore();
  console.log('FROM PROFILE');

  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogged: state.session.isLogged,
    waiting: state.profile.waiting,
  }));

  useInit(
    async () => {
      await store.get('profile').loadUserData(localStorage.getItem('token'));
    },
    [],
    { backForward: true }
  );

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
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} />
      </Spinner>
      {!select.isLogged && <Navigate to="/login" />}
    </Layout>
  );
}

export default React.memo(Profile);
