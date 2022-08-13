import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Routes, Route} from "react-router-dom"
import Product from './product';
import NotFound from '../components/not-found';
import EmptyPage from './empty-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/singlepage/:id" element={<Product/>}/>
        <Route path="*" element={<EmptyPage/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
