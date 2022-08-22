import React, {useCallback, useState, useMemo} from 'react'
import {useNavigate} from "react-router-dom";
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import AuthForm from '../../components/auth-form';
import Tools from '../../containers/tools';
import AuthUser from '../../containers/auth-user';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

function Login() {

  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({login: '', password: ''});
  const [errors, setErrors] = useState(null);

  const waiting = useSelector(state => state.auth.waiting);
  // Получаем путь, с которого пришли на страницу логина
  const from = useMemo(() => location.state?.from || "/", []);

  const callbacks = {
    // Изменение полей формы
    onFormChange: useCallback((e) => {
      setLoginForm({...loginForm, [e.target.name]: e.target.value});
      setErrors(null)
    }, [loginForm]),
    // Нажатие кнопки логина
    onSubmit: useCallback((e) => {
      e.preventDefault();

      if (loginForm.login === '' || loginForm.password === '') {
        return setErrors('Заполните все поля')
      } 
      store.get('auth').login(loginForm)
        // в случае успещной авторизации делаем редирект на предыдущую страницу
        .then(_ => navigate(from, {replace: true}))
        // если что-то пошло не так, выводим ошибки
        .catch(err => setErrors(err.message))
    }, [loginForm])
  };

  return (
    <Layout auth={<AuthUser/>} head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }
    >
      <Tools/>
      <Spinner active={waiting}>
        <AuthForm username={loginForm.login} 
                  password={loginForm.password}
                  onFormChange={callbacks.onFormChange} 
                  onSubmit={callbacks.onSubmit} 
                  t={t} 
                  errors={errors}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Login)