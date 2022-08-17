import React, {useCallback} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import List from "../components/list";
import Item from "../components/item";
import useStore from "../utils/use-store";
import Product from "../app/product";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const store = useStore();
  const modal = useSelector(state => state.modals.name);
  const select = useSelector(state => ({
    items: state.catalog.items,
  }));
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <>
      <Routes>
        <Route path ="/" element={
          <Main/>
        }>
          <Route index element={<List items={select.items} renderItem={renders.item}/>} />
          <Route path=":query" element={<List items={select.items} renderItem={renders.item}/>} />
        </Route>
        <Route path="/articles/:id" 
               element={<Product onAdd={callbacks.addToBasket} />} />
      </Routes>

      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
