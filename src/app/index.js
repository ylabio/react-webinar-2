import React, { useCallback } from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from './login-page';
import UserPage from './user-page';
import Header from '../components/header';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const token = document.cookie.slice(document.cookie.indexOf('=') + 1);

  useInit(async () => {
    await store.get('user').load(token);
  }, []);

  const userStore = store.get('user');

  const modal = useSelector((state) => state.modals.name);

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.user,
    userToken: state.user.token,
  }));

  const callbacks = {
    handleSignOut: useCallback(() => {
      userStore
        .cancelAuthorize(select.userToken)
        .then((res) => {
          if (res.result) {
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [select.userToken]),
  };

  return (
    <>
      <Header signOut={callbacks.handleSignOut} user={select.user} />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/user'} element={<UserPage userData={select.user} />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
