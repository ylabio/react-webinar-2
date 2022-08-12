import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Route, Routes } from 'react-router-dom';
import Product from './product';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <React.Fragment>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path=':id' element={<Product />} />
			</Routes>
			{modal === 'basket' && <Basket />}
		</React.Fragment>
  );
}

export default React.memo(App);
