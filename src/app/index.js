import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Routes, Route } from 'react-router-dom';
import ItemPage from './itemPage';
import {useLocation} from "react-router-dom"

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  let location = useLocation();

  let [itemId, setItemId] = useState(location.search.split("=")[1]);

  useEffect(() => {
    if(location.search !== undefined) {
      setItemId(location.search.split("=")[1]);
    }
  }, [location]);

  const renderMainElement = <>
  <Main />
  {modal === 'basket' && <Basket/>}
  </>;
  const renderItemElement = <>
  <ItemPage itemId={itemId}/>
  {modal === 'basket' && <Basket/>}
  </>;

  return (
    <>
      <Routes>
      <Route path='/' element={renderMainElement} />
      <Route path='/item' element={renderItemElement} />
      </Routes>
    </>
  );
}

export default React.memo(App);
