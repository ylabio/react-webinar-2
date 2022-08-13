import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import PageRoutes from '../PageRoutes';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      {/* <Main/> */}
      
			<PageRoutes>
				{modal === 'basket' && <Basket/>}
			</PageRoutes>
    </>
  );
}

export default React.memo(App);
