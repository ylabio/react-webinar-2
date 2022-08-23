import React, { useCallback } from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useStore from '../hooks/use-store';
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

  const userStore = store.get('user');

  const modal = useSelector((state) => state.modals.name);

  const user = userStore.store.state.user;

  const navigate = useNavigate();

  const token = document.cookie.slice(document.cookie.indexOf('=') + 1);

  React.useEffect(() => {
    userStore
      .checkToken(token)
      .then(() => {
        navigate(document.location);
      })
      .catch((err) => console.log(err));
  }, []);

  const callbacks = {
    handleSignOut: useCallback(() => {
      userStore
        .cancelAuthorize(user.token)
        .then((res) => {
          if (res.result) {
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [user.token]),
  };

  return (
    <>
      <Header signOut={callbacks.handleSignOut} user={user} />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/user'} element={<UserPage />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
