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

  useInit(async () => {
    await store.get('user').getProfile();
  }, []);

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={'/login'} element={<Auth />} />
				<Route path={'/profile'} element={<Profile />} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
