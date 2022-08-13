import React, {useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ItemInfo from './item';
import {LanguageContext} from '../localization/context';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */


function App() {
  const modal = useSelector(state => state.modals.name);
  const [language, setLanguage] = useState(localStorage.getItem('244sinfallStoreLanguage') ?? 'russian')
  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{language, setLanguage}}>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path=':itemId' element={<ItemInfo/>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default React.memo(App);
