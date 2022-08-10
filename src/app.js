import React, {useCallback, useState} from "react";
import plural from "plural-ru";
import propTypes from "prop-types";

import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import {formatter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const {items, cart, totalCount, totalSum} = store.getState();
  const [isShowCart, setIsShowCart] = useState(false);

  const callbacks = {
    onShow: useCallback(() => {
      setIsShowCart(true)
    }, []),
    onClose: useCallback(() => {
      setIsShowCart(false)
    }, []),
    getInfo: useCallback(() => {
      if (cart.length){
        return `${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')} / ${formatter(totalSum)}`
      } else {
        return "Пусто"
      }
    }, [cart])
  }

  return (
      <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onShow={callbacks.onShow} getInfo={callbacks.getInfo}/>
        <List items={items} onAdd={store.addToCart}/>
      </Layout>
        {isShowCart && (
            <Modal>
              <Cart cart={cart} onClose={callbacks.onClose} totalSum={totalSum} onRemove={store.removeCartItem}/>
            </Modal>
        )}
      </>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired
}

export default App;
