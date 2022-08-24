import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfilePage from "../../components/profile-page";
import useSelector from "../../hooks/use-selector";
import useAuth from '../../hooks/use-auth';
import Header from "../../components/header";
import useInit from '../../hooks/use-init'
import Spinner from "../../components/spinner";

function Profile() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    data: state.user.data,
    token: state.auth.token,
    auth: state.auth.auth,
    waiting: state.user.waiting
  }));

  // Загрузка данных для пользователя
  const store = useStore();

  useInit( async() => {
    if (!Object.keys(select.data).length && select.token) await store.get('user').load(select.token)
  }, [], {backForward: true});



  useAuth(select.token,'/login')




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
        <Spinner active={select.waiting}>
          <ProfilePage
            title={t('profile')}
            email={select.data.email}
            phone={select.data.profile?.phone}
            name={select.data.profile?.name}
            nameTitle={t('username')} phoneTitle={t('phone')} emailTitle={t('email')}
          />
        </Spinner>
      </Layout>
    </>
  )
}


export default React.memo(Profile);