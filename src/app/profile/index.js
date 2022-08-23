import React from 'react';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import Authorization from '../../containers/authorization';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';

function Profile() {
  const select = useSelector((state) => ({
    user: state.authorization.user,
    waiting: state.authorization.waiting,
  }));

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <Layout
        login={<Authorization />}
        head={
          <LayoutFlex flex='between'>
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }>
        <Tools />
        <ProfileCard user={select.user} />
      </Layout>
    </Spinner>
  );
}

export default React.memo(Profile);
