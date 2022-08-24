import React, {useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useToken from "../../hooks/use-token";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../components/auth-form';

function Authorization() {
  console.log('Страница авторизации');

  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    onLogin:useCallback((data) => store.get('auth').login(data)),
  }  

  // Проверка авторизации по сохраненному токену
  useToken('shop');

  useEffect(() => {
    if(select.auth.authorized) {
      // Сохраняем токен в LocalStorage
      console.log('Сохраняем новый ключ')
      localStorage.setItem('shop', JSON.stringify({token: select.auth.token})); 
      navigate('/profile');
    }
    // Очистка сообщения об ошибке
    return () => store.get('auth').clearError();
  }, [select.auth.authorized]);

  return (
    <Layout 
      head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
      }     
    > 
      <Tools/>
      <AuthForm login={callbacks.onLogin} error={select.auth.error} t={t}/>     
    </Layout>
  )
}

export default React.memo(Authorization);
