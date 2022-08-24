import React, {useEffect} from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import LoginCheck from "../components/login-check";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);
  const store = useStore();
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token && !profile.isLogin) store.get('profile').auth(token);
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/auth"} element={<Auth/>}/>
        <Route path={"/profile"} element={(
          <LoginCheck>
            <Profile/>
          </LoginCheck>
        )}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
