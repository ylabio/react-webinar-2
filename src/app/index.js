import React, { useEffect } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import Spinner from '../components/spinner';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);
  const isFetching = useSelector(state => state.auth.isFetching);
  const store = useStore();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('ylab'));
    if (userData) {
      console.log({userData})
      store.get('auth').getProfile(userData.token);
    }
    
  }, [])

  return (
    <Spinner active={isFetching}>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/profile"} element={<Profile />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </Spinner>
  );
}

export default React.memo(App);
