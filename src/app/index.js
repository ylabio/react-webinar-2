import React from 'react';
import {Routers} from "src/app/routers";
import useSelector from "../utils/use-selector";
import Basket from "./basket";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routers />
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
