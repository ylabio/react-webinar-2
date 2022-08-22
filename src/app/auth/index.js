import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Switch from '../../components/switch-button'


function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userName: state.user.data.user?.profile.name,
    authorized: state.user.authorized,
  }));

  const callbacks = {
    // Выход из профиля
    onExit: useCallback(() => store.get('user').setExit(), []),
    // Возврат на страницу, с которой был выполнен вход в профиль, после выхода из профиля
    onNavigate: useCallback((route) => navigate(route), [])
  }

  return (
    <Switch
      username={select.authorized ? select.userName : null}
      authorized={select.authorized}
      route='/login'
      value={select.authorized ? 'Выход' : 'Вход'}
      onExit={callbacks.onExit}
      onNavigate={callbacks.onNavigate}
    />
  )
}

export default React.memo(Auth);