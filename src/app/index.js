import React from "react";
import useSelector from "../hooks/use-selector";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import Login from "./login";
import ProtectedRoute from "../components/protected-route";
import PrivateRoute from "../components/private-route";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);
  const store = useStore();

  useInit(
    async () => {
      const token = localStorage.getItem("ylabToken");
      if (token) {
        await store.get("profile").authentication(token);
      }
    },
    [],
    { backForward: true }
  );

  return (
    <>
      <Routes>
        <Route path="/login" element={<PrivateRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path={""} element={<Main />} />
        <Route path={"articles/:id"} element={<Article />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
