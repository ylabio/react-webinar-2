import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');



  const modal = useSelector(state => state.modals.name);

  return (
          <>
          <Main/>
        {modal === 'basket' && <Basket/>}
          </>

  );
}

export default React.memo(App);
