import React, { useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { ContextTitle } from '../store/contextTitle';
import { Routes, Route } from 'react-router-dom';
import InfoItem from './../components/info-item/index';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {


  const modal = useSelector(state => state.modals.name);
  const titleFromLocalStorage = localStorage.getItem('title') || 'Магазин'
  const selectedNumberFromLocalStorage = JSON.parse(localStorage.getItem('selected')||1)
  const [title, setTitle] = useState(titleFromLocalStorage)
  const [itemsSkipPages, setItemsSkipPages] = useState(10);
  const [selectedNumber, setSelectedNumber] = useState(selectedNumberFromLocalStorage)
  return (

    <ContextTitle.Provider value={{ title, setTitle, itemsSkipPages,selectedNumber,setSelectedNumber }}>
      <Routes>
        <Route path="/" element={
          <Main />}
        />
        <Route path="info/:id" element={<InfoItem />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </ContextTitle.Provider>
  );
}

export default React.memo(App);
