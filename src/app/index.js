import React, { useCallback, useEffect } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import Profile from './profile';
import useStore from '../hooks/use-store';
import PrivateRouteContaiter from '../containers/private-route-contaiter';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore();

  const callbacks = {
    // Загрузка текущего пользователя
    load: useCallback(() => store.get('auth').load(), [])
  };
  
  const modal = useSelector(state => state.modals.name);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      callbacks.load();  
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Auth/>}/>
        <Route path='/profile' element={
          <PrivateRouteContaiter>
            <Profile/>
          </PrivateRouteContaiter>
        }/>
        <Route path='*' element={<Navigate to=''/>}/>
      </Routes>
      
      {modal === 'basket' && <Basket/>}
      
    </>
  );
}

export default React.memo(App);
