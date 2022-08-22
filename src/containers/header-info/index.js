import React, { useCallback } from "react";
import Header from "../../components/header";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function HeaderInfo() {
  const store = useStore();

  const select = useSelector((state) => ({
    name: state.login.name,
    isLogged: state.login.isLogged,
  }));
  const callbacks = {
    logout: useCallback(() => store.get("login").logout(), []),
  };

  return (
    <Header
      name={select.name}
      isLogged={select.isLogged}
      logout={callbacks.logout}
    />
  );
}

export default React.memo(HeaderInfo);
