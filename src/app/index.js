import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import SingleItemPage from './single-item/index';
import useStore from '../utils/use-store';
import useSelector from '../utils/use-selector';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector((state) => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route exact path="/item/:id" element={<SingleItemPage />}></Route>
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
