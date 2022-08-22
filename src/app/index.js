import React, { useEffect, useCallback } from "react";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import User from "./user";
import Authorization from "./authorization";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);

  const store = useStore();

  const callbacks = {
    setAuth: useCallback((token) => store.get("login").setAuth(token), []),
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      callbacks.setAuth(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/login"} element={<Authorization />} />
        <Route path={"/profil"} element={<User />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
