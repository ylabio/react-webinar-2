import React, {useEffect} from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(()=>{
    store.get('login').isAuth()
  },[])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route exact path ={'/login'} element = {<Login/> }/>
        <Route exact path ={'/profile'} element = {<Profile/> }/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
