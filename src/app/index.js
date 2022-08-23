import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import {useAuth} from "../hooks/use-auth";
import useStore from "../hooks/use-store";
import LoginHeader from "../containers/login-header";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const {user} = useAuth();
  const store = useStore();
  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    if(!user.username)
      await store.get('user').restore();
  }, [user]);

  return (
    <>
      <LoginHeader/>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={'/login'} element={<LoginPage/>} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
