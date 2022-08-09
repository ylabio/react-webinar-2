import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [activeCart, setActiveCart] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code, item) => {
      store.addItemToCart(code, item);
    }, []),
    onActiveCart: useCallback(() => {
      setActiveCart(!activeCart);
    }, [activeCart]),
    onDelete: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        cart={store.getState().cart}
        sumInCart={store.sumInCart()}
        onActiveCart={callbacks.onActiveCart}
      />
      <List
        items={store.getState().items}
        onAddItemToCart={callbacks.onAddItemToCart}
        activeCart={activeCart}
        onDelete={callbacks.onDelete}
      />
      {activeCart && (
        <Modal
          cart={store.getState().cart}
          sumInCart={store.sumInCart()}
          onActiveCart={callbacks.onActiveCart}
          onDelete={callbacks.onDelete}
          activeCart={activeCart}
        />
      )}
    </Layout>
  );
}

export default App;
