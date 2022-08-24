import React, {useCallback, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";

function Login(){
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    token: state.auth.token,
    waiting: state.auth.waiting,
    error: state.auth.error,
    redirect: state.auth.redirect
  }));

  const {t} = useTranslate();

  const callbacks = {
    onSubmit: useCallback((formData) => store.get('auth').login(formData), []),
  };

  // Если пользователь авторизовался и есть редирект, возвращаемся по нему на предыдущую страницу
  useEffect(() => {
    if (select.token && select.redirect) navigate(select.redirect, {replace: true});
    return () => {
      if (select.error) store.get('auth').clearError();
    }
  }, [select.token, select.error]);

  // Проверяем, авторизован ли пользователь, если да то редиректим на профайл
  if (!select.token) {
    return (
      <Layout head={<Header title={t('title')}/>}>
        <Tools/>
        <Spinner active={select.waiting}>
          <LoginForm onSubmit={callbacks.onSubmit} error={select.error}/>
        </Spinner>
      </Layout>
    )
  } else return <Navigate to="/profile" replace={true}/>
}

export default React.memo(Login);
