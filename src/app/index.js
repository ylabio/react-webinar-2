import React from 'react';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import {Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './login';
import UserPage from './user';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();
  useInit(async () => {
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    modal: state.modals.name,
    token: state.auth.token || localStorage.token,
  }));

  return (
    <>
      <Routes>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={
          select.token ? <UserPage /> 
          : <Navigate to={'/login'}/>}/>
        <Route index path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
