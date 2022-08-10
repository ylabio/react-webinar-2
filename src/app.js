import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import {sumCalculated, sumQuantity} from "./utils";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {
  const state = store.getState();
  
  const [isCartModalActive, setIsCartModalActive] = React.useState(false);
  
  const callbacks = {
    handleAddItemToCart: useCallback((item) => {
      store.addItemToCart({code: item.code, title: item.title, price: item.price});
    }, []),
    handleDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
  }
  
  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls setIsCartModalActive={setIsCartModalActive} totalPrice={state.totalPrice} totalUniqueCount={state.totalUniqueCount}/>
        <List
          items={state.items}
          handleAddItemToCart={callbacks.handleAddItemToCart}
        />
      </Layout>
      {isCartModalActive &&
        <Modal
        setIsModalActive={() => setIsCartModalActive(false)}
          title={'Корзина'}
        >
          <Cart
            cartItems={state.cartItems}
            handleDeleteCartItem={callbacks.handleDeleteCartItem}
            totalPrice={state.totalPrice}
            totalUniqueCount={state.totalUniqueCount}
          />
        </Modal>
      }
    </>
  );
}

export default App;
