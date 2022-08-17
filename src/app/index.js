import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InfoPage from './info-page'
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App() {

const modal = useSelector(state => state.modals.name);

  console.log('App');

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/info/:id' element={<InfoPage />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
