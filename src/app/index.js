import React from "react";
import Main from "../app/main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Route, Routes } from "react-router-dom";
import ItemPage from "./item-page";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);

  let location = useLocation();
  let [itemId, setItemId] = useState(location.search.split("=")[1]);

  useEffect(() => {
    setItemId(location.search.split("=")[1]);
  }, [location]);
  
  const renderBasket = 
  <>
    {modal === "basket" && <Basket />};
  </>

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
             {renderBasket}
            </>
          }
        />
        <Route
          path="/item"
          element={
            <>
              <ItemPage itemId={itemId} />
           {renderBasket}
            </>
          }
        />
      </Routes>
    </>
  );
}

export default React.memo(App);
