import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Description from "./description";


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/page/:page" element={<Main />}/>
        </Route>
        <Route path="/description/:_id" element={<Description />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
