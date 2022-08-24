import React, { useCallback, useEffect, useState } from "react";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginBar from "../components/login-bar";
import Login from "./login";
import Profile from "./profile";
import Layout from "../components/layout";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const [validating, setValidating] = useState(true);
  const modal = useSelector((state) => state.modals.name);
  const username = useSelector((state) => state.profile.username);
  const token_data = useSelector((state) => ({
    token: state.auth.token,
    is_token_valid: state.auth.is_token_valid,
  }));

  const store = useStore();

  useInit(async () => {
    await store
      .get("profile")
      .getProfile(token_data.token, (value) =>
        store.get("auth").setTokenValidity(value)
      );
    setValidating(false);
  }, [token_data.token]);

  const logout = useCallback(async () => {
    await store.get("auth").logout();
  }, []);

  const content = validating ? (
    <Layout />
  ) : (
    <>
      <LoginBar username={username} logout={logout} />
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );

  return content;
}

export default React.memo(App);
