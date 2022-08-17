import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {Route, Routes} from "react-router-dom";
import Details from "./details";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);
  const store = useStore();
  const select = useSelector(state => ({
          amount: state.basket.amount,
          sum: state.basket.sum,
          items: state.catalog.items,
          totalCount: state.catalog.totalCount,
          currentPage: state.catalog.currentPage,
          countForPage: state.catalog.countForPage
      }));

  return (
    <>
      <Routes>
        <Route
            index path="/"
            element={<Main
                store={store}
                items={select.items}
                amount={select.amount}
                sum={select.sum}
                totalCount={select.totalCount}
                currentPage={select.currentPage}
                countForPage={select.countForPage}
            />}
        />
        <Route
            index
            path="/articles/:id"
            element={<Details
                store={store}
                amount={select.amount}
                sum={select.sum}
            />}
        />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
