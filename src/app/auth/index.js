import React, {useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Switch from '../../components/switch-button'

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const resetError = () => store.get('user').resetError();

  const select = useSelector(state => ({
    userName: state.user.userName,
    authorized: state.user.authorized,
  }));

  const callbacks = {
    // Выход из профиля
    onExitProfile: useCallback(() => store.get('profile').setExitProfile(), []),
    // Завершение сессии
    onExitUser: useCallback(() => store.get('user').closeUser(), []),
    // Возврат на страницу, с которой был выполнен вход в профиль, после выхода из профиля
    onNavigate: useCallback((route) => navigate(route), []),
    // Загрузка данных пользователя для вывода в профиль
    onProfile: useCallback(() => store.get('profile').setProfile(), [])
  }

  // Сброс ошибки сервера
  useEffect(() => {
    resetError();
  })

  return (
    <Switch
      username={select.authorized ? select.userName : null}
      authorized={select.authorized}
      route='/login'
      value={select.authorized ? 'Выход' : 'Вход'}
      onExitProfile={callbacks.onExitProfile}
      onExitUser={callbacks.onExitUser}
      onNavigate={callbacks.onNavigate}
      onProfile={callbacks.onProfile}
    />
  )
}

export default React.memo(Auth);