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
import PrivateRoute from "../containers/private-route";
import LoginLayout from "../containers/login-layout";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const {token, isAuth} = useAuth();
  const store = useStore();
  const modal = useSelector(state => state.modals.name);

  useInit(async () => {
    if(token)
      await store.get('auth').restore();
  }, [token]);

  return (
    <>
      <Routes>
        <Route path={'/*'} element={<LoginLayout/>}>
          <Route path={''} element={<Main/>}/>
          <Route path={"articles/:id"} element={<Article/>}/>
          <Route path={"profile"} element={<PrivateRoute auth={isAuth}><Profile/></PrivateRoute>}/>
          <Route path={'login'} element={<LoginPage/>} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
