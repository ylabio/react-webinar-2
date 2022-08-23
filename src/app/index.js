import React, { useEffect, useCallback } from "react";
import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import User from "./user";
import Authorization from "./authorization";
import Btn from "../components/btn/btn";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const select = useSelector((state) => ({
    log: state.login.log,
    user: state.login.user,
    modal: state.modals.name,
  }));

  const store = useStore();

  const callbacks = {
    setAuth: useCallback((token) => store.get("login").setAuth(token), []),
    setLogin: useCallback(
      () => store.get("login").setLogin(select.log),
      [select.log]
    ),
    setDelete: useCallback((token) => store.get("login").setDelete(token), []),
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      callbacks.setAuth(localStorage.getItem("token"));
    }
  }, []);

  const btnExit = (
    <Btn
      title="Выйте"
      name={select.user.name}
      setLogin={callbacks.setLogin}
      setDelete={callbacks.setDelete}
    />
  );

  return (
    <>
      <Routes>
        <Route path={""} element={<Main btnExit={btnExit} />} />
        <Route path={"/login"} element={<Authorization />} />
        <Route path={"/profile"} element={<User btnExit={btnExit} />} />
        <Route path={"/articles/:id"} element={<Article btnExit={btnExit} />} />
      </Routes>
      {select.modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
