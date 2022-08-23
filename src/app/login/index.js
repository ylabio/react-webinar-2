import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import LoginForm from "../../components/login";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

function LoginPage() {
  const navigate = useNavigate();
  const {isAuth, token} = useAuth();
  const store = useStore();
  const {t} = useTranslate();
  const error = useSelector(state=> state.user.message)

  const callbacks = {
    logIn: useCallback((login, pass) => store.get('user').logIn(login, pass), []),
  };
  useInit(()=> {
    {isAuth || token ? navigate('/') : navigate('/login')}
  },[isAuth]);

  return (
    <Layout  head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LoginForm callback={callbacks.logIn} title={'Вход'} error={error} t={t}/>
    </Layout>
  )
}

export default React.memo(LoginPage);
