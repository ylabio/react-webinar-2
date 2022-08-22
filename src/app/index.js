import React from "react";
import useSelector from "../hooks/use-selector";
import { Routes, Route, useNavigate } from "react-router-dom";
import useStore from "../hooks/use-store";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginForm from "./login-form";
import UserMenu from "./user-menu";
import HeaderLink from "../components/header-link";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  const userStore = store.get("user");

  let navigate = useNavigate();

  const token = document.cookie.slice(document.cookie.indexOf("=") + 1);

  React.useEffect(() => {
    userStore
      .checkToken(token)
      .then(() => {
        navigate(document.location);
      })
      .catch((err) => console.log(err));
  }, []);

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <HeaderLink />
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/user"} element={<UserMenu />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
