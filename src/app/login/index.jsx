import React, { useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import LayoutPage from '../../layouts/layout-page';
import LayoutFlex from '../../layouts/layout-flex';
import LocaleSelect from "../../containers/locale-select";
import Tools from '../../containers/tools';
import Spinner from '../../components/spinner';
import LoginForm from '../../components/login-form';
import UserPreview from '../../containers/user-preview';

// тут при входе на сайт, происходил редирект в профиль, из него обратно сюда
// и снова в профиль, как мог исправил
//
const Login = () => {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    profileLogged: state.profile.logged, // доступен всему сайту
    pending: state.login.pending,
    logged: state.login.logged, // успешная авторизация, доступен только тут
    error: state.login.error,
    errorText: state.login.errorText,
  }));

  // очистка стора
  useEffect(() => {
    return () => store.get('login').clear();
  }, []);

  // срабатывает если пользователь авторизовался, check() достаёт токен из куки,
  // загружает данные пользователя и переключает profileLogged
  useEffect(() => {
    if (select.logged) store.get('profile').check();
  }, [select.logged]);

  // из-за чего тут происходит редирект в профиль
  useEffect(() => {
    if (select.profileLogged) navigate('/profile');
  }, [select.profileLogged]);

  const callbacks = {
    login: useCallback((login, password) => {
      store.get('login').login(login, password);
    }, []),
  };

  // перенаправляет если зайти авторизованным
  return select.profileLogged
    ? <Navigate to='/profile' />
    : (
      <LayoutPage head={<>
        <UserPreview />
        <LayoutFlex place="row-between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      </>}>
        <Tools />
        <Spinner active={select.pending}>
          <LoginForm onSubmit={callbacks.login} error={select.error} errorText={select.errorText} />
        </Spinner>
      </LayoutPage>
    )
}

export default React.memo(Login);