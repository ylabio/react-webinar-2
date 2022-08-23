import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import {useAuth} from "../../hooks/use-auth";
import LoginBar from "../../components/login-bar";

function LoginHeader() {
  const {user, isAuth} = useAuth();
  const store = useStore();
  const {t} = useTranslate();
  const callbacks = {
    logOut: useCallback(() => store.get('user').logOut(), []),
  };

  return (
    <LoginBar userName={isAuth ? user.username : ''} logOut={callbacks.logOut} t={t}/>
  );
}

export default React.memo(LoginHeader);
