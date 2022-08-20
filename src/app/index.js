import React from 'react';
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

  let navigate = useNavigate();

  const token = document.cookie.slice(document.cookie.indexOf('=') + 1);

  React.useEffect(() => {
    userStore
      .checkToken(token)
      .then(() => {
        navigate(document.location);
      })
      .catch((err) => console.log(err));
  }, []);

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Header />
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
