import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import useSelector from '../utils/use-selector';

import Main from './main';
import Basket from './basket';
import ItemDetails from './item-details';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
	console.log('App');

	const modal = useSelector((state) => state.modals.name);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/articles/:id" element={<ItemDetails />} />
			</Routes>
			{modal === 'basket' && <Basket />}
		</BrowserRouter>
	);
}

export default React.memo(App);
