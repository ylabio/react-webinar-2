import React, {useEffect} from 'react';
import useSelector from '../hooks/use-selector';
import {Routes, Route} from 'react-router-dom';
import useStore from "../hooks/use-store";
import Auth from './auth';
import Main from './main';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Basket from './basket';


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const modal = useSelector(state => state.modals.name);
  const isAuthed = useSelector(state => state.user.authorized)

  // Восстановление сеанса пользователя
  useEffect(() => {
    if (!isAuthed && window.localStorage.getItem('access_token')) {
      store.get('user').restoreUser();
      store.get('profile').setProfile();
    }
  }, [])

  return (
    <>
      <Auth/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
