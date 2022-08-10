import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import CartPrice from './components/cart-price';
import Layout from "./components/layout";
import Modal from './components/modal';
import Item from './components/item';
import CartItem from './components/cart-item';


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

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onModalBtn={callbacks.onModalBtn} items={store.getState().itemsAmount} totalPrice={store.getState().totalPrice}/>
      <List items={store.getState().items}
            onHandleBtn={callbacks.onAddToCart}  
            component={Item}
      />
      { active && 
      <Modal head={<h2>Корзина</h2>}
             onModalBtn={callbacks.onModalBtn}>
          <List items={store.getState().cart}
                onHandleBtn={callbacks.onDeleteItem}
                component={CartItem} />
          <CartPrice totalPrice={store.getState().totalPrice}/>
      </Modal>}
    </Layout>
  );
}

export default App;
