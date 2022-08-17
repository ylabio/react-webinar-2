import React, { useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { ContextTitle } from '../store/contextTitle';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {


  const modal = useSelector(state => state.modals.name);
  const titleFromLocalStorage = localStorage.getItem('title')||'Магазин'
  const [title,setTitle] = useState(titleFromLocalStorage)
  const [itemsSkipPages, setItemsSkipPages] = useState(10);

  return (

    <ContextTitle.Provider value={{title, setTitle,itemsSkipPages}}>
      <Main />
      {modal === 'basket' && <Basket />}
    </ContextTitle.Provider>
  );
}

export default React.memo(App);
