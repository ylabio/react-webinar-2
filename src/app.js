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
  const [isModalActive, setIsModalActive] = React.useState(false);
  
  const totalPrice = sumCalculated(store.getState().cartItems);
  
  const totalCount = sumQuantity(store.getState().cartItems);
  
  const callbacks = {
    handleAddItemToCart: useCallback((item) => {
      store.addItemToCart({code: item.code, title: item.title, price: item.price});
    }, []),
    handleDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
  }
  
  const handleCloseModal = () => {
    setIsModalActive(false)
  }
  
  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls setIsModalActive={setIsModalActive} totalPrice={totalPrice} totalCount={totalCount}/>
        <List
          items={store.getState().items}
          handleAddItemToCart={callbacks.handleAddItemToCart}
        />
      </Layout>
      {isModalActive &&
        <Modal
          handleCloseModal={handleCloseModal}
        >
          <Cart
            cartItems={store.getState().cartItems}
            handleDeleteCartItem={callbacks.handleDeleteCartItem}
            totalPrice={totalPrice}
            totalCount={totalCount}
          />
        </Modal>
      }
    </>
  );
}

export default App;
