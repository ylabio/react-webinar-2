import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../locale-select";
import Auth from "../auth";
import ProfilePage from "../../components/profile-page";
import useSelector from "../../hooks/use-selector";
import useAuth from '../../hooks/use-auth';
import useInit from '../../hooks/use-init'

function Profile() {
  const {t} = useTranslate();
  const store = useStore();


  const select = useSelector(state => ({
    data: state.user.user.data,
    token: state.user.token,
    auth: state.user.auth
  }));
  // Загрузка данных для пользователя
  useInit( async() => {
      if (select.auth !== false || select.token.length > 1) await store.get('user').load()
    }, [], {backForward: true});


  useAuth(select.token, 'login');

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } auth={<Auth/>
    }>
      <Tools/>
      <ProfilePage
        title={t('profile')}
        email={select.data.email}
        phone={select.data.profile?.phone}
        name={select.data.profile?.name}
        nameTitle={t('username')} phoneTitle={t('phone')} emailTitle={t('email')}
      />
    </Layout>
  )
}


export default React.memo(Profile);