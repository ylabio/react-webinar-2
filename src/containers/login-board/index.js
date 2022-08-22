import React, { useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";
import LoginBoardLayout from "../../components/login-board-layout";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";

function LoginBoard() {
  const store = useStore();

  useInit(
    async () => {
      if (localStorage.getItem("token")) {
        await store.get("login").authCheck();
      }
    },
    [],
    { backForward: true }
  );

  const select = useSelector((state) => ({
    user: state.login.user,
    isAuth: state.login.isAuth,
    isLoading: state.login.isLoading,
  }));

  const callbacks = {
    logOut: useCallback(() => store.get("login").logout(), []),
  };

  const { t } = useTranslate();

  return (
    <Spinner active={select.isLoading}>
      <LoginBoardLayout
        user={select.user}
        logOut={callbacks.logOut}
        isAuth={select.isAuth}
        t={t}
      />
    </Spinner>
  );
}

export default React.memo(LoginBoard);
