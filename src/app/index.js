import React, { useEffect, useState } from "react";
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Route, Routes } from "react-router";
import ItemPage from "./item-page";
import Preloader from "../components/preloader";
import LoaderRoute from "../components/loader-route";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log("App");

  const { modal, request } = useSelector((state) => ({ modal: state.modals.name, request: state.catalog.request }));

  return (
    <>
      <Routes>
        <Route path="/" element={<LoaderRoute request={request} />}>
          <Route path="" element={<Main />} />
          <Route path="item/:id" element={<ItemPage />} />
        </Route>
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
