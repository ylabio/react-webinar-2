import React from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route } from 'react-router-dom';
import LayoutRoot from './layout-root';
import Login from './login/login';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Profile from './profile';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/*" element={<LayoutRoot />}>
          <Route path="" element={<Main />} />
          <Route path="articles/:id" element={<Article />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
