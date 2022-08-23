import React from 'react';
import useTranslate from '../../hooks/use-translate';
import TopMenu from '../../components/top-menu/index.';
import Auth from '../../containers/auth';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import UserInfo from '../../components/user-info';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import useAuth from '../../hooks/use-auth';

const Profile = () => {
  const {t} = useTranslate();
  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
    waiting: state.auth.waiting
  }));
  useAuth()
  return (
    <div>
      <TopMenu>
        <Auth/>
      </TopMenu>
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
        <Tools/>
        <Spinner active={select.waiting}>
          <UserInfo title={t('profile.title')} email={select.user.email} name={select.user.profile?.name}
                    nameTitle={t('profile.name')} phone={select.user.profile?.phone}
                    phoneTitle={t('profile.phone')}/>
        </Spinner>
      </Layout>
    </div>
  )
};

export default React.memo(Profile);