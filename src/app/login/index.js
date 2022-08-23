import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/admin/login-form";
import PanelLogin from "../../containers/panel-login";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import useRedirect from "../../hooks/use-redirect";
import useInit from "../../hooks/use-init";

function Login() {
  const store = useStore();

  /**
   * Обнуление ошибки
   */
  useInit(async () => {
      await store.get('error').removeErr();
  }, []);

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    err: state.error.err,
    waiting: state.login.waiting,
  }));

  useRedirect(select.isAuth, '/login', '/');

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    logIn: useCallback(data => store.get('login').logIn(data), []),
  };

  return (
    <Layout
      panelLogin={
        <PanelLogin />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm logIn={callbacks.logIn} err={select.err} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
