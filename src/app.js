import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    addItemToCart: useCallback((item) => {
      store.addItemToCart({ ...item, quantity: 1 });
    }, []),
    deleteItemToCart: useCallback((item) => {
      store.deleteItemToCart(item);
    }, []),
    onShowCart: useCallback(() => {
      store.showCart(store.getState().showCart);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        cartItems={store.getState().cartItems}
        showCart={store.getState().showCart}
        onShowCart={callbacks.onShowCart}
        deleteItemToCart={callbacks.deleteItemToCart}/>
      <List items={store.getState().items}
            onClick={callbacks.addItemToCart}
            text="Добавить" 
      />
    </Layout>
  );
}

export default App;
