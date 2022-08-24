import React, { useEffect } from 'react';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from './profile';
import PrivateRoute from './private-route';
import ProtectedRoute from './protected-route/index';
import { useCallback } from 'react';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
	const store = useStore();

	const select = useSelector(state => ({
		modal: state.modals.name,
		isAuth: state.auth.isAuth,
		user: state.profile.user
	}));

	const navigate = useNavigate();
	const location = useLocation();

  useInit(async () => {
    const flagIsAuth = await store.get('auth').authentication();
		if(flagIsAuth && location.pathname === '/profile') {
			navigate('/profile');
		}
  }, []);

	const callbacks = {
		authentication: useCallback(async () => {
			const flagIsAuth = await store.get('auth').authentication();
			if(flagIsAuth) {
				navigate('/profile');
			}
		}, [])
	};

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
				<Route path={"/login"} element={
					<PrivateRoute isAuth={select.isAuth} redirectUrl="/">
						<Login/>
					</PrivateRoute>
				}/>
				<Route path={"/profile"} element={
					<ProtectedRoute isAuth={select.isAuth} redirectUrl="/login" asyncFunc={callbacks.authentication}>
						<Profile/>
					</ProtectedRoute>
				}/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
