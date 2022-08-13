import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Main from "./main";
import Article from './article';
import Basket from "./basket";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const location = useLocation();

  return (
    <>
      <Routes location={location.state?.modal || location}>
        <Route path="/" element={<Main />}>
          <Route path="/page/:page" element={<Main />}/>
        </Route>
        <Route path="/article/:_id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {location.state?.modal && (
        <Routes>
          <Route path="/basket" element={<Basket />} />
        </Routes>
      )}
    </>
  );
}

export default React.memo(App);
