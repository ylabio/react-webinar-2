import React from 'react';
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import useInit from '../hooks/use-init';
import {Routes, Route} from "react-router-dom";
import PrivateRoute from '../containers/private-route';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    status: state.login.status,
  }));

  useInit(async () => {
    if (select.status === 'no_auth') {
      await store.get('login').checkAuth();
    }
  }, [], {backForward: true});

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/profile"} element={<PrivateRoute><Profile/></PrivateRoute>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
