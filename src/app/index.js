import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from "./authorization";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import ProtectedRoute from "../components/protected-route";
import BackRedirect from "../components/back-redirect";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const location = useLocation();
  console.log('в APP', location);

  useInit(async () => {
    console.log('useInit App');
    const data = localStorage.getItem('shop');
    if (data) {
      const {token} = JSON.parse(data);
      await store.get('profile').getProfile(token); 
      await store.get('auth').loadAuthorizationData(token);
    } 
  }, [], {backForward: true});

  const modal = useSelector(state => state.modals.name);
  const auth = useSelector(state => state.auth);

  const myPath = location.state?.from ? location.state.from?.pathname : '';
  console.log('myPath', myPath);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>

        <Route path={'/login'} element={
          <BackRedirect status={auth.authorized} redirectPath={myPath}>
            <Authorization/>
          </BackRedirect>
        }/>

        <Route path={'/profile'} element={
          <ProtectedRoute status={!auth.authorized && !localStorage.getItem('shop')} redirectPath={'/login'}>
            <Profile/>
          </ProtectedRoute>        
        }/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
