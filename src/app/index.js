import React, { useCallback } from "react";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginBar from "../components/login-bar";
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modals.name);
  const auth_data = useSelector((state) => ({
    username: state.auth.username,
    token: state.auth.token,
  }));

  const store = useStore();

  const logout = useCallback(async () => {
    await store.get("auth").logout(() => {
      navigate("/", { replace: true });
    });
  }, []);

  return (
    <>
      <LoginBar username={auth_data.username} logout={logout} />
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
