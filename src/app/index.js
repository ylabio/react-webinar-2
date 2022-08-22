import React from 'react';
import useSelector from '../hooks/use-selector';
import {Routes, Route} from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import RequireAuth from '../containers/require-auth';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import {callMeIfPresentInStorage} from '../utils/callMeIFPresentInStorage';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);
  const store = useStore();

  useInit(async () => {
    await callMeIfPresentInStorage(
      'xToken',
      store.get('login').signInWithToken
    );
  });

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
