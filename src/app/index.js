import React, { useEffect, useState } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import Spinner from '../components/ui/spinner';
import PrivateRoutes from '../containers/private-routes';
import useAuth from '../hooks/use-auth';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);
  const [isChecked] = useAuth();

  return (
    <Spinner active={!isChecked}>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login />}/>
        <Route element={<PrivateRoutes />}>
          <Route path={"/profile"} element={<Profile />}/>
        </Route>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </Spinner>
  );
}

export default React.memo(App);
