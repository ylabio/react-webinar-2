import React, { useEffect } from 'react';
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import PrivateRoute from '../containers/private-route';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const select = useSelector(state => ({
    modal: state.modals.name,
    token: state.auth.token
  }));

  // Загружаем данные пользователя если есть токен
  useEffect(() => {
    if (select.token) store.get('auth').loadUser(select.token);
  }, [])

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/profile"} element={<PrivateRoute/>}>
          <Route path={"/profile"} element={<Profile/>}/>
        </Route>
        <Route path={"/login"} element={<Login/>}/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
