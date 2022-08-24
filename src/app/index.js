import React from 'react';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import RequireAuth from '../containers/require-auth';
import NonRequireAuth from '../containers/non-require-auth';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore()

  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    await store.get('auth').loadUser()
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route element={<RequireAuth redirectPath='/login'/>}>
          <Route path={"/profile"} element={<Profile/>}/>
        </Route>
        <Route element={<NonRequireAuth redirectPath='/profile'/>}>
          <Route path={"/login"} element={<Login/>}/>
        </Route>
        <Route path={"*"} element={<Navigate to='/'/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
