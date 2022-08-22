import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/profile-card';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    user: state.user.data
  }));

  useInit(() => {
    if (!select.isLogged) {
      navigate('/login', { state: { from: location } });
    }
  }, [select.isLogged]);

  const { t } = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect />
      </LayoutFlex>
    }>
      <Tools />
      <ProfileCard user={select.user} />
    </Layout>
  );
}

export default React.memo(Profile);
