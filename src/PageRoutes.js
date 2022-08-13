import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './app/main';
import Article from './article';

const PageNotFound = () => {
	return <h1>Not found</h1>
};

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