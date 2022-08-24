import React, { useCallback } from "react";
import Header from "../../components/header";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../../hooks/use-store";

function HeaderContainer() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location at header: ", location.pathname);

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
  }));

  const callbacks = {
    // Переход на страницу логинизации
    login: useCallback(() => navigate('/login', { state: { from: location } }), [location]),
    // Запрос на удаление token
    logout: useCallback(() => store.get('auth').logout(), []),
  };

  return (
    <Header action={select.isAuth ? callbacks.logout : callbacks.login} 
            userName={select.userName} 
            link={"/profile"}
            t={t} />
  );
}

export default React.memo(HeaderContainer);
