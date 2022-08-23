import React, { useEffect } from 'react';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import {Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from './profile';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
	const store = useStore();

  useInit(async () => {
    await store.get('auth').authentication();
  }, []);

  const select = useSelector(state => ({
		modal: state.modals.name,
		isAuth: state.auth.isAuth,
		user: state.auth.user
	}));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
				<Route path={"/login"} element={select.isAuth ? <Navigate to="/"/> : <Login/>}/>
				<Route path={"/profile"} element={Object.keys(select.user).length ? <Profile/> : <Navigate to="/login"/>}/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
