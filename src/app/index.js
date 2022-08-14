import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "../router";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
      <BrowserRouter>

          <AppRouter/>
          {modal === 'basket' && <Basket/>}

      </BrowserRouter>
  );
}

export default React.memo(App);
