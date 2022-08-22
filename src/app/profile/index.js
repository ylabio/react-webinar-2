import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import ProfileCart from '../../components/profile-cart';
import Layout from '../../components/wrappers/layout';
import LayoutFlex from '../../components/wrappers/layout-flex';
import Spinner from '../../components/wrappers/spinner';
import AuthHeader from '../../containers/auth-header';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  useInit(async () => {
    await store.get('auth').loadProfile();
  }, []);

  const select = useSelector(state => ({
    auth: state.auth
  }));

  if (!localStorage.getItem("token")) {
    navigate('/login');
  }

  return (
    <Layout
      auth={<AuthHeader />}
      head={
        <LayoutFlex LayoutFlex flex="between" >
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex >
      }>
      <Tools />
      <Spinner active={select.auth.waiting}>
        <ProfileCart
          name={select.auth.user.profile?.name}
          tel={select.auth.user.profile?.phone}
          email={select.auth.user.email}
        />
      </Spinner>
    </Layout >
  )
}

export default React.memo(Profile);