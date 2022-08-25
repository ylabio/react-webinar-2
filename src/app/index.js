import React, { useCallback } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from './authorization';
import Profile from './profile';
import useAuth from '../hooks/use-auth';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore()

  const modal = useSelector(state => state.modals.name);
  const {isAuth} = useAuth();

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={isAuth? <Profile /> : <Authorization />}/>
        <Route path={"/profile"} element={isAuth? <Profile /> : <Authorization/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
