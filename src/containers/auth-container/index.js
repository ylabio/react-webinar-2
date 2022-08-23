import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import LayoutFlex from '../../components/layouts/layout-flex';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';

function AuthContainer() {
  const store = useStore();
  const authMessage = useSelector(state=> state.auth.message)

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация пользователя
    setUser: useCallback((login, pass) => store.get('auth').setUser(login, pass), []),
    removeUser: useCallback(() => store.get('auth').removeUser(), []),
  };

  return (
    <LayoutFlex flex='start'>
{/* //TODO add translate */}
      <LoginForm title={t('auth.title')} callback={callbacks.setUser} authMessage={authMessage}/>
    </LayoutFlex>
  );
}

export default AuthContainer;
