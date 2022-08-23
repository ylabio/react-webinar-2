import React, {useCallback} from 'react';
import useSelector from "../hooks/use-selector";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Header from "../components/header";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import useTranslate from "../hooks/use-translate";
import useInit from "../hooks/use-init";
import LoginChecker from "../containers/login-checker";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  
  const store = useStore();
  
  const {modal, userName, isAuth} = useSelector(state => {
    return {
      modal: state.modals.name,
      userName: state.user.user?.profile?.name,
      isAuth: state.user.isAuth,
    }
  });
  
  const callbacks = {
    // Сброс авторизации
    logout: useCallback(() => store.get('user').logout(), []),
    // Получение данных при первом рендере
    getUserProfile: useCallback(() => store.get("user").getUserProfile(), [])
  };
  
  useInit(() => {
    callbacks.getUserProfile()
  }, []);
  
  const {t} = useTranslate()
  
  return (
    <>
      <Header buttonText={isAuth ? t('header.logout') : t('header.login')} userName={userName} isAuth={isAuth}
              logout={isAuth ? callbacks.logout : null}/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/login'} element={<LoginChecker condition={!isAuth} path={'/profile'}><Login/></LoginChecker>}/>
        <Route path={'/profile'} element={<LoginChecker condition={isAuth} path={'/login'}><Profile/></LoginChecker>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
