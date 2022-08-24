import React from 'react';
import useSelector from "../hooks/use-selector";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './../components/login/index';
import UserInfo from './../components/user-info/index';
import RequireAuth from '../hoc/RequireAuth';
/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const select = useSelector(state => ({
    user: state.user.user,
    modal: state.modals.name
  }));
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route element={<RequireAuth auth={localStorage.getItem('token')} />}>D
          <Route path={'/profile/:id'} element={<UserInfo />} />
        </Route>
      </Routes>
      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
