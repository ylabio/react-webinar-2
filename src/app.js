import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import Modal from "./components/modal";
import Item from './components/item'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const products = store.getState().items;
  const {items: cart, totalAmount, uniqueItems} = store.getState().cart; // Переименовываю массив items, взятый путем деструктуризации, чтобы исбежать путаницы 

  const [isModalOpen, setModalOpen] = React.useState(false);

  console.log('app')

  const callbacks = {
    onCartClick: useCallback(() => {
      setModalOpen(true);
    }, []),
    onAdd: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDelete: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
    onCloseModal: useCallback(() => {
      setModalOpen(false);
    }),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        onCartClick={callbacks.onCartClick}
        amount={totalAmount}
        uniqueItems={uniqueItems}
      />
      <List items={products} onButtonClick={callbacks.onAdd} itemRenderer={Item}/>
      {isModalOpen && (
        <Modal title={"Корзина"} closeModal={callbacks.onCloseModal}> 
          <Cart     
            cart={cart}
            cartAmount={totalAmount}
            deleteItem={callbacks.onDelete}/>
        </Modal>
      
      )}
    </Layout>
  );
}

export default App;
