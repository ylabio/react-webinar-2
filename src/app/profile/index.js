import React from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import LoginTools from '../../containers/login-tools';
import UserCard from '../../components/user-card';

function Profile() {
  const store = useStore();

  const {t} = useTranslate();

  return (
    <Layout
      head={
        <>
          <LoginTools />
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        </>
      }
    >
      <Tools />
      <UserCard />
    </Layout>
  );
}

export default React.memo(Profile);
