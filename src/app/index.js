import React from 'react';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginLayout from './login-layout';
import ProfileLayout from './profile-layout';
import AuthUser from '../containers/auth-user';
import NonAuthUser from '../containers/non-auth-user';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    await store.get('auth').getUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route element={<NonAuthUser path='/login' />}>
          <Route path={'/profile'} element={<ProfileLayout />} />
        </Route>
        <Route element={<AuthUser path='/profile' />}>
          <Route path={'/login'} element={<LoginLayout />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
