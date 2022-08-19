import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import LayoutFlex from '../../components/layouts/layout-flex';
import LoginForm from '../../components/login-form';

function AuthContainer() {
  const store = useStore();

  const select = useSelector((state) => ({
    auth: state.auth,
    lang: state.locale.lang,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация пользователя
    setUser: useCallback((login, pass) => store.get('auth').setUser(login, pass), []),
    removeUser: useCallback((login, pass) => store.get('auth').removeUser(), []),
  };

  return (
    <LayoutFlex flex='start'>
{/* //TODO add translate */}
      <LoginForm title={t('auth.title')} callback={callbacks.setUser}/> 
      <button onClick={callbacks.removeUser}>Выйти</button>
      <pre>{store.get('auth').login}</pre>
    </LayoutFlex>
  );
}

export default AuthContainer;
