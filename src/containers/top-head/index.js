import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import MenuRegister from "../../components/menu-register";

function TopHead() {
  const store = useStore();

  const select = useSelector(state => ({
    token: state.authorization.token,
    user: state.authorization.userData,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Разлогиниться (удалить токен и сбросить все данные в state)
    logout: useCallback(() => store.get('authorization').logout(), [])
  };
  
  return (
    <MenuRegister token={select.token} onLogout={callbacks.logout} user={select.user} t={t}/>
  )
}

export default React.memo(TopHead);