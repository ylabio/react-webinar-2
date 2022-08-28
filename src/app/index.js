import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from './login-page';
import ProfilePage from './profile-page';
import AuthContainer from '../containers/auth-container';
import useStore from './../hooks/use-store';
import useInit from './../hooks/use-init';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);
  const store = useStore();
  const token = localStorage.getItem('token')

  useInit(async () => {
    await store.get('user').loadProfile(token);
  }, [token]);

  useInit(async () => {
    await store.get('catalogCategory').setCategoryList();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<AuthContainer><ProfilePage/></AuthContainer>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
