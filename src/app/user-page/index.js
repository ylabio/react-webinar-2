import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import User from '../../components/user';

function UserPage() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    waiting: state.user.waiting,
    user: state.user,
  }));

  const content = () => {
    if (select.waiting === false && Object.keys(select.user.user).length) {
      return <User user={select.user.user} />;
    }
    if (select.waiting === false && Object.keys(select.user.user).length === 0) {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>{content()}</Spinner>
    </Layout>
  );
}

export default React.memo(UserPage);
