import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import UserMenu from "../../components/user-menu";

function TopMenu() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    isLogin: state.auth.token,
    user: state.auth.user,
  }));

  const callbacks = {
    onReset: useCallback(() => store.get("auth").resetUser(), []),
  };

  return (
    <UserMenu
      title={select.user ? "logOut" : "logIn"}
      userName={select.user}
      reset={callbacks.onReset}
      t={t}
    />
  );
}

export default React.memo(TopMenu);
