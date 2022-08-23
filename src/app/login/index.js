import React, {useCallback, useEffect, useMemo} from "react";
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
import {Navigate} from "react-router-dom";

function Login(){
  const store = useStore();
  const {lang, t} = useTranslate();

  const select = useSelector(state => ({
    error: state.authorisation.error,
    waiting: state.authorisation.waiting,
    redirect: state.path.redirect,
    previousPage: state.path.previous,

    authorisedUser: state.authorisation.authorisedUser,
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

  useEffect(() => () => {
    store.get('authorisation').reset();
    store.get('path').setPreviousPath(true, true);
  }, []);

  if (!select.previousPage && select.authorisedUser) return <Navigate replace to="/profile"/>;
  if (select.previousPage && select.authorisedUser && select.redirect) return <Navigate replace to="/profile"/>;
  if (select.previousPage && select.authorisedUser && !select.redirect) history.back();

  return (
    <Layout head={
              <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
                <LocaleSelect/>
              </LayoutFlex>
            }
            profileMenu={<ProfileMenu />}>
      <Tools/>
      <Spinner active={select.waiting}>
        <LoginForm data={data.login} onSubmit={callbacks.onLoginClick} error={select.error}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login);
