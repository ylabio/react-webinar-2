import React from 'react';
import { Routes, Route } from "react-router-dom";

import Main from "./main";
import Basket from "./basket";

import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { ProfileProduct } from './profile-product';
import { ProductById } from '../components/product-by-Id';

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
        <Route path="ProfileProduct" element={<ProfileProduct />} >
          <Route path=":id" element={<ProductById />} />
        </Route>

        <Route exact path="*" element={<Main />} />
      </Routes>
      {modal === 'basket' && <Basket />}

</>
  );
}

export default React.memo(App);
