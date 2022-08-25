import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import FormLogin from "../../components/form-login";
import LayoutAuth from "../../components/layout-auth";
import { useLocation, useNavigate} from "react-router-dom";
import Loader from "../../components/loader";
import Spinner from "../../components/spinner";


function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.authorization.token,
    error: state.authorization.error,
    waiting: state.authorization.waiting,
    user: state.profile.userData?.profile,
  }));

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'

  useEffect(() => {
    // редирект после авторизации
    if (select.token) {
      navigate(from, {replace: true})
    }
    // очистка ошибки
    return () => store.get('authorization').cleanError();
  }, [select.token])

  const callbacks = {
    // Логин
    login: useCallback(data => store.get('authorization').loginRequest(data), [])
  };

  const {t} = useTranslate();
  
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>} 
      topHead={ 
        <TopHead/>
      }>

      <Tools/>
      {select.waiting ? <Loader/> :
      <LayoutAuth title={<h2>{t('login')}</h2>}>
        <FormLogin onLogin={callbacks.login} token={select.token} error={select.error} t={t}/>
      </LayoutAuth>}
    </Layout>
  )
}


export default React.memo(Login);