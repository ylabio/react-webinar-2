import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useStore from '../utils/use-store';
import Main from './main';
import Basket from './basket';
import SingleItemPage from './single-item/index';
import useSelector from '../utils/use-selector';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const store = useStore();

  const modal = useSelector((state) => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/item/:id" element={<SingleItemPage />}></Route>
        <Route
          exact
          path="/"
          element={
            <>
              <Main />
            </>
          }
        ></Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </Router>
  );
}

export default React.memo(App);
