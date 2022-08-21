import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginLinks from "../../components/login-links";

function LoginMenu() {
  const store = useStore();

  const select = useSelector(state => ({
    login: state.login,
    user: state.login.user,
    status: state.login.status,
  }));
  
  const callbacks = {
    // Сброс авторизации
    logout: useCallback(_id => store.get('login').logout(), []),
  };

  return (
    <LoginLinks
      status={select.status}
      user={select.user}
      profileLink={'/profile'}
      loginLink={'/login'}
      onLogout={callbacks.logout}
    />
  );
}

export default React.memo(LoginMenu);
