import useInit from "hooks/use-init";
import useStore from "hooks/use-store";
import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Login from "./login";
import Basket from "./basket";
import Article from "./article";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore();

  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    await store.get('auth').self();
  }, []);


  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
