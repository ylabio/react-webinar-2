import React, { useCallback } from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import { getUserToken } from '../utils/localstorage/auth';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);

  const token = getUserToken();

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={token ? <Profile /> : <Navigate to={'/login'} />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
