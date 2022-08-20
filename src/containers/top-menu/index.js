import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import UserMenu from "../../components/user-menu";
import Spinner from "../../components/spinner";

function TopMenu() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    isLogin: state.auth.token,
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    onReset: useCallback(() => store.get("auth").resetUser(), []),
  };

  return (
    <Spinner active={select.waiting}>
      <UserMenu
        title={select.user ? "logOut" : "logIn"}
        userName={select.user}
        reset={callbacks.onReset}
        t={t}
      />
    </Spinner>
  );
}

export default React.memo(TopMenu);
