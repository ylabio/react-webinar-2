import React, { useEffect } from 'react'
import ProfileCart from '../../components/profile-cart';
import Layout from '../../components/wrappers/layout';
import LayoutFlex from '../../components/wrappers/layout-flex';
import Spinner from '../../components/wrappers/spinner';
import AuthHeader from '../../containers/auth-header';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    session: state.session,
    profile: state.profile
  }));

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
      <Spinner active={select.session.waiting}>
        <ProfileCart
          name={select.profile.user.profile?.name}
          tel={select.profile.user.profile?.phone}
          email={select.profile.user.email}
        />
      </Spinner>
    </Layout >
  )
}

export default React.memo(Profile);