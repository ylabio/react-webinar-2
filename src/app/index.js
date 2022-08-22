import React from 'react';
import useSelector from '../hooks/use-selector';
import {Routes, Route} from 'react-router-dom';
import Auth from './auth';
import Main from './main';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Basket from './basket';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Auth/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
