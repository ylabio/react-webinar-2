import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Cart from "./components/cart"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  let [isCartOpen, setIsCartOpen] = useState(false);

  let {totalCartPrice, totalCartItemsCount, cart} = store.getState();

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
  }

  return (
    <>
    {isCartOpen ? <Cart cart={cart} totalCartPrice={totalCartPrice} onCartClose={() => setIsCartOpen(false)} onDeleteItemFromCart={callbacks.onDeleteItemFromCart} /> : <></>}
    <Layout head={<h1>Магазин</h1>}>
      <Controls
             totalCartPrice={totalCartPrice}
             totalCartItemsCount={totalCartItemsCount}
             onCartOpen={() => setIsCartOpen(true)}
             />
      <List items={store.getState().items}
            itemFunc={callbacks.onAddItemToCart}
      />
    </Layout>
    </>
  );
}

export default App;
