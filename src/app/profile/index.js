import React from 'react';
import ProfileCard from '../../components/profile-card';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';

function Profile() {
  const select = useSelector(state => ({
    user: state.user.data
  }));

  const { t } = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect />
      </LayoutFlex>
    }>
      <Tools />
      <ProfileCard user={select.user} t={t} />
    </Layout>
  );
}

export default React.memo(Profile);
