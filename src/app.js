import React, {useCallback} from 'react';
import Cart from "./components/cart";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, []),
    deleteFromCart: useCallback((item) => {
      store.deleteFromCart(item);
    }, []),
  }

  return (
    <Layout isModal={false} head={<h1>Магазин</h1>}>
      <Cart
        cartItems={store.getState().cart.items}
        totalPrice={store.getState().cart.totalPrice}
        deleteFromCart={callbacks.deleteFromCart}
      />
      <List isCart={false} items={store.getState().items} onAddDeleteToCart={callbacks.onAddToCart}/>
    </Layout>
  );
}

export default App;
