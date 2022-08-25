import React from 'react';
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import useInit from '../hooks/use-init';
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import ProfileIsAuth from "../containers/profile-isauth"

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get('login').isAuth();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    modal: state.modals.name,
    user: state.login.user,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/profile"} element={<ProfileIsAuth user={select.user}/>}/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
