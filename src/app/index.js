import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Article from '../article';
import PageNotFound from './page-not-found';

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
      
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/article/:id" element={<Article />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>

				{modal === 'basket' && <Basket/>}
			</BrowserRouter>
    </>
  );
}

export default React.memo(App);
