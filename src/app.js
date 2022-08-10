import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import CartList from './components/cart-list';
import CartPrice from './components/cart-price';
import Layout from "./components/layout";
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [active, setActive] = useState(false)

  const callbacks = {
    onModalBtn: useCallback(() => {
      setActive(!active)
    }, [active]),
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [])
    
  }
  // items={store.getState().cart}
  //            totalPrice={store.getState().totalPrice}
  //            onModalBtn={callbacks.onModalBtn} 
  //            onDeleteItem={callbacks.onDeleteItem}

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onModalBtn={callbacks.onModalBtn} items={store.getState().itemsAmount} totalPrice={store.getState().totalPrice}/>
      <List items={store.getState().items}
            onHandleBtn={callbacks.onAddToCart}  
      />
      { active && 
      <Modal head={<h2>Корзина</h2>}
             onModalBtn={callbacks.onModalBtn}>
          <CartList items={store.getState().cart}
            onHandleBtn={callbacks.onDeleteItem} />
          <CartPrice totalPrice={store.getState().totalPrice}/>
      </Modal>}
    </Layout>
  );
}

export default App;
