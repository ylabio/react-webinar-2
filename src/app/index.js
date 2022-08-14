import React from 'react';
import Home from './home-page';
import Main from "./main";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './product-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  return (
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}>
					<Route index element={<Home />} />
					<Route path="product/:id" element={<Product />} />
				</Route>
			</Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
