import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ItemInfo from './item';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */


function App() {
  const modal = useSelector(state => state.modals.name);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path=':itemId' element={<ItemInfo/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
