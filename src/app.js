import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAmountIncrease: useCallback((code) => {
      store.amountIncrease(code);
    }, []),
    onCartOpen: useCallback(() => {
      store.openCart();
    }, []),
    onCartClose: useCallback(() => {
      store.closeCart();
    }, []),
  }

  const isCartOpen = store.getState().isCartOpen;

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onCartOpen={callbacks.onCartOpen}/>
      <List
        items={store.getState().items}
        onAmountIncrease={callbacks.onAmountIncrease}
      />
      {isCartOpen && <Cart onClose={callbacks.onCartClose} />}
    </Layout>
  );
}

export default App;
