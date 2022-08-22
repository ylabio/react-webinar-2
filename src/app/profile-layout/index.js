import React from 'react'
import Layout from '../../components/layout';
import useTranslate from '../../hooks/use-translate';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector'
import Profile from '../../components/profile'
import User from '../../containers/user';
import Spinner from '../../components/spinner';

function ProfileLayout() {

  const select = useSelector(state => ({
    user: state.auth.user,
    waiting: state.auth.waiting
  }));
  const {t} = useTranslate();

  return (
    <Layout auth={<User/>} head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }
    >
      <Tools/>
      <Spinner active={select.waiting}>
        <Profile user={select.user} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(ProfileLayout)