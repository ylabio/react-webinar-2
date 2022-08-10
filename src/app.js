import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutCart from './components/layout-cart';
import ListCart from './components/list-cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [openModal, setOpenModal] = useState(false);

  const callbacks = {
    onShowCart: useCallback(() => {
      setOpenModal(true);
    }, []),
    onCloseCart: useCallback(() => {
      setOpenModal(false);
    }, []),
    onDeleteItemsCart: useCallback((code, price, quantity) => {
      store.deleteItemCart(code, price, quantity);
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
        sumPricesInCart={store.state.sumPricesInCart} 
        quantityUnicItemsCart={store.state.quantityUnicItemsCart}
      />
      <List 
        items={store.getState().items} 
        onAddProductToCart={callbacks.onAddProductToCart} 
      />
    </Layout>
    {openModal && (
      <LayoutCart 
        head={<><h1>Корзина</h1><button onClick={callbacks.onCloseCart}>Закрыть</button></>}
      >
        <ListCart 
          itemsCart={store.state.itemsCart} 
          sumPricesInCart={store.state.sumPricesInCart}
          quantityUnicItemsCart={store.state.quantityUnicItemsCart} 
          onItemCartDelete={callbacks.onDeleteItemsCart}
        />
      </LayoutCart>
    )}
    </>
  );
}

export default App;
