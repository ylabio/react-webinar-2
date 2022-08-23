import React from 'react';
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import UserPage from './user';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get('auth').setSelf();
  }, [], {backForward: true});

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'login'} element={<Login/>}/>
        <Route path={'profile'} element={<UserPage/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
