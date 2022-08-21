import React, {useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileMenu from "../../containers/profile-menu";
import LoginForm from "../../components/login-form";

function Login(){
  const store = useStore();
  const {lang, t} = useTranslate();

  const select = useSelector(state => ({
    error: state.authorisation.error,
    waiting: state.authorisation.waiting,
  }));

  const callbacks = {
    onLoginClick: useCallback((login, password) => store.get('authorisation').login(login, password), []),
  };

  const data = {
    login: useMemo(() => ({
      title: t('login.title'),
      login: t('login.login'),
      password: t('login.password'),
      send: t('login.send'),
    }), [lang]),
  }

  return (
  <>
    <ProfileMenu />
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm data={data.login} onSubmit={callbacks.onLoginClick} error={select.error}/>
      </Spinner>
    </Layout>
  </>
  )
}

export default React.memo(Login);
