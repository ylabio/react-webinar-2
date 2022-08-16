import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Route, Routes } from 'react-router-dom';
import Product from './product';
import NotFound from './not-found'

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
				<Route path='/' element={<Main />}>
					<Route path='page/:pageIndex' element={<Main />} />
				</Route>
				<Route path='articles/:id' element={<Product />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			{modal === 'basket' && <Basket />}
		</React.Fragment>
  );
}

export default React.memo(App);
