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
import useStore from '../../hooks/use-store';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();

  React.useEffect(() => {
    store.get('profile').checkUser(localStorage.getItem('token'));
  }, []);

  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogged: state.profile.isLogged,
    waiting: state.profile.waiting,
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
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} />
      </Spinner>
      {!select.isLogged && <Navigate to="/login" />}
    </Layout>
  );
}

export default React.memo(Profile);
