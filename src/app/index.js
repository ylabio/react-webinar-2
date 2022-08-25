import React from 'react';
import useSelector from "../hooks/use-selector";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { useEffect, useCallback } from 'react';
import useStore from '../hooks/use-store';
import { RequireAuth } from './requre-auth';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();
  const callbacks = {
    me: useCallback(() => store.get('auth').me(), []),

  };

  useEffect(() => {
    callbacks.me()
  }, [])
  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
