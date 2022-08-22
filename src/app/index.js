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
import useAuth from '../hooks/use-auth';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore()
  const [isAuth, token] = useAuth()

  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    // делаем запрос на получение юзера, если имеем сохраненный токен
    token && await store.get('auth').loadUser()
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={!isAuth ? <Login/> : <Navigate to='/profile' replace/>}/>
        <Route path={"/profile"} element={isAuth ? <Profile/> : <Navigate to='/login' replace/>}/>
        <Route path={"*"} element={<Navigate to='/'/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
