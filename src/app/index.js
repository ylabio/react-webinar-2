import React, {useCallback, useEffect} from 'react';
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
      isAuth: state.user.isAuth
    }
  });
  
  const callbacks = {
    // Сортировка
    logout: useCallback(() => store.get('user').logout(), []),
  };
  
  useEffect(() => {
    store.get("user").getUserProfile()
  }, []);
  
  const {t} = useTranslate()
  
  return (
    <>
      <Header buttonText={isAuth ? t('header.logout') : t('header.login')} userName={userName} isAuth={isAuth} logout={isAuth ? callbacks.logout : null}/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/login'} element={!isAuth ? <Login/> : <Navigate to={'/profile'}/>}/>
        <Route path={'/profile'} element={isAuth ? <Profile/> : <Navigate to={'/login'}/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
