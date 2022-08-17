import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSelector from "../utils/use-selector";
import Basket from "./basket";
import Details from './details';
import Main from "./main";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='details/:id' element={<Details/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
