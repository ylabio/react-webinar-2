import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const callbacks = {
    addItem: useCallback((code) => {
      store.addToCart(code);
    }, []),

    removeItem: useCallback((code) => {
      store.removeItem(code)
    }, []),

    openModal: useCallback(() => {
      setIsModalOpen(true)
    }, []),

    closeModal: useCallback(() => {
      setIsModalOpen(false)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        total={store.getState().total}
        amount={store.getState().amount}
        openModal={callbacks.openModal} />
      <List 
        items={store.getState().items}
        addItem={callbacks.addItem}
      />
      <Cart 
        items={store.getState().cart}
        isModalOpen={isModalOpen}
        closeModal={callbacks.closeModal}
        removeItem={callbacks.removeItem}
        total={store.getState().total}
      />
    </Layout>
  );
}

export default App;
