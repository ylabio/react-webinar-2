import React from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Authorized from './authorized';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();
  console.log('FROM APP');

  useInit(() => {
    localStorage.getItem('token') &&
      store.get('session').checkAccess(localStorage.getItem('token'));
  }, []);
  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <Authorized>
              <Profile />
            </Authorized>
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
