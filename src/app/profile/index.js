import React from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import UserMenu from '../user-menu';
import Spinner from '../../components/spinner';
import useCheck from '../../hooks/use-check';
import { useLocation, useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  // useCheck('profile', '/login');

  useInit(async () => {
    await store.get('profile').loadUserData(localStorage.getItem('token'));
  }, []);

  const select = useSelector((state) => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    isLogged: state.session.isLogged,
  }));

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
    </Layout>
  );
}

export default React.memo(Profile);
