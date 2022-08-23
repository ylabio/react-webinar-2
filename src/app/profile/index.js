import React from 'react';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import Spinner from '../../components/spinner';
import UserDetails from '../../components/user-details';
import LocaleSelect from '../../containers/locale-select';
import LoginPanel from '../../containers/login-panel';
import Tools from '../../containers/tools';
import useAuth from '../../hooks/use-auth';
import useCheckAuth from '../../hooks/use-check-auth';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

const Profile = () => {
  const { t } = useTranslate();
  const { user } = useAuth();

  const select = useSelector((state) => ({
    loading: state.user.loading,
  }));

  useCheckAuth();

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
      <Spinner active={select.loading}>
        <UserDetails user={user} t={t} />
      </Spinner>
    </Layout>
  );
};

export default React.memo(Profile);
