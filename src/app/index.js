import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route, useLocation} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore();
  const location = useLocation();

  useInit(async () => {
    await store.get('login').checkLogin();
  }, [location]);

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
