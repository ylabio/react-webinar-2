import React, {useEffect} from 'react';
import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile";
import { useNavigate } from "react-router-dom";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(()=>{
    preLogin();
  }, [])
  
  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/auth"} element={<Auth/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );

  async function preLogin() {
    if(window.localStorage.getItem("login") != undefined){
      const result = await store.get('user').auth(window.localStorage.getItem("login"), window.localStorage.getItem("password"));
  
      if (result) {
        navigate("../");
      } else {
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("password");
      }
    }
  }
}

export default React.memo(App);
