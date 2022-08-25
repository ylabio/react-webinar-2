import React from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from "../../hooks/use-store";
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';
import Loader from '../../components/loader';
import LoginControl from '../../containers/login-control';
import useInit from '../../hooks/use-init';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    auth: state.auth,
    profile: state.profile
  }));

  useInit(async () => {
    await store.get('profile').getProfile(select.auth.token);
  }, [], {backForward: true});

  const { name, phone, email } = select.profile;

  return (
    <>
      {select.profile.waiting ? (
        <Loader />
      ) : (
        <Layout
          loginControl={<LoginControl/>}
          head={
            <LayoutFlex flex='between'>
              <h1>{t('title')}</h1>
              <LocaleSelect />
            </LayoutFlex>
          }
        >
          <Tools />
          <ProfileInfo name={name} phone={phone} email={email} t={t} />
        </Layout>
      )}
    </>
  );
}

export default React.memo(Profile);
