import React from 'react';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginLayout from './login-layout';
import ProfileLayout from './profile-layout';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore()

  const modal = useSelector(state => state.modals.name);
  const token = useSelector(state => state.auth.token);
  const isAuth = useSelector(state => state.auth.isAuth);

  useInit(async () => {
    token && await store.get('auth').getUser()
  }, [])

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={!isAuth ? <LoginLayout/> : <Navigate to='/profile'/>}/>
        <Route path={"/profile"} element={isAuth ? <ProfileLayout/> : <Navigate to='/login'/>}/> 
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);