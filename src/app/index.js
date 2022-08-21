import React, {useEffect} from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import SignIn from "./sign-in";
import useStore from "../hooks/use-store";
import cookieValue from "../utils/cookieValue";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.get('user').initUserAuth(cookieValue('token'));
  }, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/user"} element={<Profile/>}/>
        <Route path={"/sign_in"} element={<SignIn/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
