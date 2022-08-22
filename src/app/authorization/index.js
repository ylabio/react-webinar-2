import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthControls from "../../components/auth-controls";
import AuthForm from "../../components/auth-form";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { getCookie } from "../../utils/coockie";

function Authorization() {
  const navigate = useNavigate();
  const token = getCookie('token');
  const name = localStorage.getItem('name');

  const store = useStore();

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    error: state.user.error,
  }));
  //console.log('ERROR!!!!!!', select.error)
  const {t} = useTranslate();

  const callbacks = {
    redirect: useCallback(() => { navigate('/authorization') }, []),
    onSubmit: useCallback(async (data) => {
      try {
        await store.get('user').authorize(data);
        navigate(-1);
      } catch (error) {
         throw error;
      }

    }, []),

    logout: useCallback(() => {
      const token = getCookie('token');
      store.get('user').logout(token);
    }, [])
  }

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
      <AuthForm error={select.error} onSubmit={callbacks.onSubmit}/>
    </Spinner>
  </Layout>
  )
}

export default React.memo(Authorization);
