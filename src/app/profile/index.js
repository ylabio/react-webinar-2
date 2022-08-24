import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useToken from '../../hooks/use-token';
import useStore from "../../hooks/use-store";
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';
import Loader from '../../components/loader';
import LoginControl from '../../containers/login-control';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  //! Пока так восстанавливаем страницу
  useEffect(() => {
    const data = localStorage.getItem('shop');
    if (data) {
      const {token} = JSON.parse(data); 
      store.get('profile').getProfile(token);
    }    
  }, []);

  const select = useSelector((state) => ({
    auth: state.auth,
    profile: state.profile
  }));

  const { name, phone, email } = select.profile;

  // Проверка авторизации по сохраненному токену
  useToken('shop');

  return (
    <>
      {select.auth.waiting ? (
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
