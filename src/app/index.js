import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get('authorisation').checkAuthorisation();
    if(window.location.pathname !== '/login') store.get('path').setPreviousPath(true);
  }, []);

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'catalog/:page'} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/profile"} element={<Profile />}/>
        <Route path="" element={<Navigate replace to="catalog/1"/>} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
