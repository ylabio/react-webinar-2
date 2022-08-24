import React, {useEffect} from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import PrivateRoute from '../hoc/private-route';
import ClosedRoute from '../hoc/closed-route';
import useStore from "../hooks/use-store";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);
  const token = useSelector(state => state.authentication.token);
  const select = useSelector(state => ({
    modal: state.modals.name,
    token: state.authentication.token,
    errorMessage: state.authentication.errorMessage,
    isAuth: state.authentication.isAuth
  }))
  const store = useStore();

  useEffect(() => {
    if(select.token) {
      store.get('authentication').logInByToken();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={
          <ClosedRoute>
            <Login/>
          </ClosedRoute>
        }/>
        <Route path={"/profile"} element={
          <PrivateRoute to='/login'>
            <Profile/>
          </PrivateRoute>
        }/>
      </Routes>
      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
