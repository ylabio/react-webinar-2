import React from 'react';
import {Route, Routes} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
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
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />

        <Route path={'/login'}>
          <Route path={':redirectPage/:pageId'} element={<Login />} />
          <Route path={':redirectPage'} element={<Login />} />
          <Route path={''} element={<Login />} />
        </Route>

        <Route path={'/profile'} element={<Profile />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
