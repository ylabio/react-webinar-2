import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Cart from './components/cart';
import Popup from './components/popup';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const { cart, totalPrice,  isOpenCart } = store.getState()

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    setOpenCart: useCallback((isOpenCart) => {
      store.setOpenCart(isOpenCart);
    }, []),
    removeFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls setOpenCart={callbacks.setOpenCart}
                  totalPrice={totalPrice}
                  countOfItems={cart.length}
        />
        <List items={store.getState().items}
              action={callbacks.addToCart}
        />
      </Layout>
      { 
        isOpenCart && <Popup close={() => callbacks.setOpenCart(false)}>
          <Cart setOpenCart={callbacks.setOpenCart}
              removeFromCart={callbacks.removeFromCart}
              cart={cart}
              totalPrice={totalPrice}
          />
        </Popup> 
      }
    </>
  );
}

export default App;
