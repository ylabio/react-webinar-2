import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthControls from "../../components/auth-controls";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import ProfileInfo from "../../components/profile-info";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { getCookie } from "../../utils/coockie";

function Profile() {
  const navigate = useNavigate();
  const store = useStore();
  const token = getCookie('token');
  const name = localStorage.getItem('name');

  const {t} = useTranslate();

  const select = useSelector(state => ({
    info: state.user.info,
    waiting: state.user.waiting,
    name: state.user.info.profile.name,
  }));

  const callbacks = {
    redirect: () => { navigate('/authorization') },
    logout: useCallback(() => {
      store.get('authorize').logout(token);
      navigate('/authorization');
    }, []),
    getInfo: useCallback(() => {
      store.get('user').getInfo(token);
    } , [])
  }

  useInit(async () => {
    await store.get('user').getInfo(token);
  }, []);

  return(
    <Layout
      control={
        <AuthControls
          token={token}
          name={name}
          logout={callbacks.logout}
          redirect={callbacks.redirect}
        />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
  }>
    <Tools/>
    <Spinner active={select.waiting}>
      <ProfileInfo info={select.info} />
    </Spinner>
  </Layout>
  )
}

export default React.memo(Profile);
