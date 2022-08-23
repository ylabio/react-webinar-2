import React from 'react';
import {Routes, Route} from "react-router-dom";

import useSelector from "../hooks/use-selector";
import useSessionUp from '../hooks/use-sessionUp';

import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import Login from "./login";
import Page404 from "./404";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  //Воcстановление сессии 
  useSessionUp();

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
