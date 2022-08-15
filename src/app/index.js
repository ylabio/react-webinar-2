import React from 'react';
import Main from '../app/main'
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import ItemPage from './item-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {


  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={ 
        <>
          <Main />
          {modal === 'basket' && <Basket/>}
        </>
      } />
      <Route path='/item' element={
        <>
         <ItemPage />
          {modal === 'basket' && <Basket/>}
        </>
      } />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
