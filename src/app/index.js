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
  const [title, setTitle] = useState('Магазин');
  return (

    <ContextTitle.Provider value={{title, setTitle}}>
      <Main />
      {modal === 'basket' && <Basket />}
    </ContextTitle.Provider>
  );
}

export default React.memo(App);
