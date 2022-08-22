import React, { useCallback } from "react";
import Header from "../../components/header";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";

function HeaderContainer() {
  //   const {lang, setLang, t} = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    name: state.auth.user.name,
  }));

  const callbacks = {
    // 
    login: useCallback(() => navigate('/login'), []),
    // 
    logout: useCallback(() => store.get('auth').logout(), []),
  };

  return (
    <Header action={select.isAuth ? callbacks.logout : callbacks.login} 
            userName={select.name} 
            link={"/profile"} />
  );
}

export default React.memo(HeaderContainer);
