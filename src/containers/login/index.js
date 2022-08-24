import React, { useCallback } from "react";
import LoginHead from "../../components/login-head";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function Login() {
  const store = useStore();
  const select = useSelector(state => ({
    name: state.auth.loginData.name,
    loggedIn: state.auth.loggedIn
  }))
  

  useInit(async () => {
    await store.get('auth').loginByToken();
  }, [], { backForward: false });

  const callbacks = {
    // Выход из аккаунта
    signOut: useCallback(() => store.get('auth').signOut(), [])
  };

  const options = {
    name: select.loggedIn ? select.name : "",
    buttonText: select.loggedIn ? "Выйти" : "Вход",
    signOut: select.loggedIn ? callbacks.signOut : () => {},
    toLog: select.loggedIn ? "/" : "/login",
    toSelf: "/profile",
  }

  return (
    <LoginHead name={options.name} toLog={options.toLog} toSelf={options.toSelf} signOut={options.signOut} buttonText={options.buttonText}  />
  );
}

export default React.memo(Login);
