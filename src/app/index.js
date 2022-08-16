import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ItemCard from "../components/item-card";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
      <BrowserRouter>
          <Routes >
              <Route exact path="/" element={<Main/>} />
              <Route exact path="/:id" element={<ItemCard/>} />
          </Routes>
          {modal === 'basket' && <Basket/>}
      </BrowserRouter>
  );
}

export default React.memo(App);
