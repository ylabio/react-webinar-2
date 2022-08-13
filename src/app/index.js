import React from 'react';
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Routing from './routing';

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
