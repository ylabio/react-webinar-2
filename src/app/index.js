import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import Pagination from './pagination';
import Routing from '../routing';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routing />
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
