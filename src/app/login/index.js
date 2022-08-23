import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LoginForm from "../../components/form-components/login-form";
import useSelector from "../../hooks/use-selector";

function Login() {
  const store = useStore();
  
  const callbacks = {
    // Функция логина
    login: useCallback((login, password) => store.get('user').login(login, password), []),
  };
  
  const {errorMessage} = useSelector(state => {
    return {
      errorMessage: state.user.errorMessage,
    }
  });
  
  const {t} = useTranslate();
  
  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
        <LoginForm errorMessage={errorMessage} login={callbacks.login} t={t}/>
    </Layout>
  )
}

export default React.memo(Login);
