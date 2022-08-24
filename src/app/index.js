import React from 'react';
import useSelector from "../hooks/use-selector";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import Profile from './profile';
import NonLoggedRoute from './routes/non-logged-route';
import PrivateRoute from './routes/private-route';
import Login from '../containers/login';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Login />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<NonLoggedRoute><Auth /></NonLoggedRoute>} />
        <Route path={"/profile"} element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
