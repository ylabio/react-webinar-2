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
import AuthCheck from "../containers/auth-check";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore();

  const modal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    user: state.session.user,
    loadingError: state.session.loadingError
  }))

  // Восстановление сессии по токену
  useInit(() => {
    if (!select.user && localStorage.getItem('TOKEN') && !select.loadingError) {
      store.get('session').getProfile();
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path={""} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/profile"} element={<AuthCheck><Profile/></AuthCheck>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
