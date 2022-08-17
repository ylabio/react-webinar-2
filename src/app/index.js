import React from 'react';
import Main from "./main";
import Basket from "./basket";
import {Routes, Route} from "react-router-dom"
import useSelector from "../utils/use-selector";
import {BrowserRouter} from "react-router-dom"
import ItemPage from './item-page';
import { routes } from '../utils/routes';
import Langs from './langs';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Langs />
      <Routes>
        <Route path={routes.articles(":id")} element={<ItemPage/>}/>
        <Route path={routes.home()} element={<Main/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
