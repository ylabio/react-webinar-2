import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './app/main';
import Article from './article';
import PageNotFound from './app/page-not-found';

function PageRoutes(props) {
	return (
		<>
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/article/:id" element={<Article />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>

				{props.children}
			</BrowserRouter>
		</>
	)
}

export default PageRoutes;