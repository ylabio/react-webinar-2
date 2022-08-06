import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  // const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    // onOpenCart: useCallback(() => {
    //   setModalActive(true);
    // }, []),
    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteCartItems: useCallback((code) => {
      store.deleteCartItems(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls store={store}
                cartItems={store.getState().cartItems}
                deleteCartItems={callbacks.onDeleteCartItems}/>
      <List items={store.getState().items}
            button={callbacks.addItemToCart}
            buttonText={'Добавить'}/>

      {/*<Modal children={<Cart store={store}/>}/>*/}
    </Layout>
  );
}

export default App;
