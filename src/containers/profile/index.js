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
import Header from "../../components/header";

function Profile() {
  const {t} = useTranslate();


  const select = useSelector(state => ({
    data: state.user.data,
    token: state.user.token,
    auth: state.user.auth
  }));

  // // Загрузка данных для пользователя
  // const store = useStore();
  // useInit( () => {
  //     if ((select.auth !== false  || select.token.length > 1) && !Object.keys(select.data).length)  store.get('user').load()
  //   }, [], {backForward: true});

  useAuth(select.token, 'login');


  return (
    <>
      <Header>
        <Auth/>
      </Header>
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
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
    </>
  )
}


export default React.memo(Profile);