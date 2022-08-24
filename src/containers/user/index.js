import React, { useCallback } from "react";
import UserControls from "../../components/user-controls";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";

function User() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    token: state.user.token,
    user: state.user.data,
  }));

  const callbacks = {
    // Функция выхода из аккаунта
    onLogout: useCallback(() => store.get("user").onLogout(), []),
  };

  return (
    <UserControls user={select.user} onLogout={callbacks.onLogout} t={t} />
  );
}

export default React.memo(User);
