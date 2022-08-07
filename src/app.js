import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [openModal, setOpenModal] = useState(false);

  const sumPrices = store.state.itemsCart.reduce((a, b) => a + b.price * b.quantity, 0);

  const callbacks = {
    onShowCart: useCallback(() => {
      setOpenModal(true);
    }, []),
    onCloseCart: useCallback(() => {
      setOpenModal(false);
    }, []),
    onDeleteItemsCart: useCallback((code) => {
      store.deleteItemCart(code);
    }, []),
    onAddProductToCart: useCallback((item) => {
      store.addProductToCart({item});
    }, []),
  }

  return (
    <>
    <Layout head={<h1>Магазин</h1>}>
      <Controls 
        onShowCart={callbacks.onShowCart} 
        sumPrices={sumPrices} 
        itemsCart={store.state.itemsCart}
      />
      <List 
        items={store.getState().items} 
        onAddProductToCart={callbacks.onAddProductToCart} 
      />
    </Layout>
    {openModal && (
      <Modal 
        onCloseCart={callbacks.onCloseCart} 
        onItemCartDelete={callbacks.onDeleteItemsCart} 
        itemsCart={store.state.itemsCart}
        sumPrices={sumPrices}
      />
    )}
    </>
  );
}

export default App;
