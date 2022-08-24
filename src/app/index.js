import React from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import PrivatValidation from "../containers/privat-validation";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);
  const store = useStore()
    useInit(async () => {
        if (localStorage.getItem('token')) {
            await store.get('login').checkLogin(localStorage.getItem('token'));
        }
    }, []);
  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
          <Route path={"/login"} element={<Login/>}/>

          <Route path={"/profile"} element={
              <PrivatValidation>
                  <Profile/>
              </PrivatValidation>

          }/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
