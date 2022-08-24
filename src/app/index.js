import React from 'react';
import useSelector from "../hooks/use-selector";
import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import CheckSession from '../containers/check-session';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();
  const location = useLocation();

  useInit(async () => {
    console.log('Start Session');

    if (localStorage.getItem('token')) {
      await store.get('session').loadSession(localStorage.getItem('token'));
    }
  }, [])

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<CheckSession><Profile /></CheckSession>} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
