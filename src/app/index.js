import React, { useMemo } from 'react';
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

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/profile/:userId' element={<UserPage />}/>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
