import React, { useCallback, useEffect } from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import { getUserToken } from '../utils/localstorage/auth';
import AuthentificationCheker from '../containers/authentification-cheker';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const select = {
    modal: useSelector((state) => state.modals.name),
    user: useSelector((state) => state.user),
  };

  const location = useLocation();
  console.log(location);
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={<AuthentificationCheker page={<Profile />} redirectLink={'/login'} />}
        />
      </Routes>
      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
