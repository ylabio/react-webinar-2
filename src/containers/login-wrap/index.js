import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginAuth from "../../components/login-auth";

function LoginWrap() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    login: state.login,
    user: state.login.user,
    status: state.login.status,
  }));
  
  const callbacks = {
    logout: useCallback((_id) => store.get("login").logout(), []),
    logoutRedirect: useCallback(() => {
      if (!select.user) {
        navigate("/");
      } 
    }, 
   []),
  };

  return (
    <LoginAuth
      status={select.status}
      user={select.user}
      profileLink={"/profile"}
      loginLink={"/login"}
      onLogout={callbacks.logout}
      logoutRedirect={callbacks.logoutRedirect}
    />
  );
}

export default React.memo(LoginWrap);
