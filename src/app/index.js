import React, { useMemo } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import useStore from '../hooks/use-store';
import Profile from './profile';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const { isAuth } = useSelector(state => ({
    isAuth: state.user.isAuth
  }))

  // useInit(async () => {
  //   await store.get('user').getProfile();
  // }, [], {backForward: true});

  useMemo(() => {
    store.get('user').getProfile();
  }, [isAuth])

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route
					path={'/login'}
					element={isAuth ? <Navigate to='/' /> : <Auth />}
				/>
				<Route
					path={'/profile'}
					element={isAuth ? <Profile /> : <Navigate to='/login' />}
				/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
