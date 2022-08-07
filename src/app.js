import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import ShopCart from "./components/cart";


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [showCart, setShowCart] = useState(false);

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addItem(code);
    }, []),
    onOpen: useCallback(() => {
        setShowCart(!showCart);
    }, []),
    onDelete: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>} layout='Layout'>
      <Controls cart={store.getState().shoppingCart} 
            onOpen={callbacks.onOpen}
      />
      <List items={store.getState().items}
            onItemAdd={callbacks.onAdd}
      />
      {showCart && <ShopCart store={store} show={showCart} setShow={setShowCart} />}
    </Layout>
  );
}

export default App;
