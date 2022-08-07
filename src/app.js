import React, {useCallback, useState} from "react";
import plural from "plural-ru";
import propTypes from "prop-types";

import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const items = store.getState().items
  const cart = store.getState().cart
  const rub = '\u20bd';
  const [isShowCart, setIsShowCart] = useState(false);

  const callbacks = {
    onShow: useCallback(() => {
      setIsShowCart(true)
    }, []),
    onClose: useCallback(() => {
      setIsShowCart(false)
    }, []),
    getTotalSum: useCallback(() => {
      if(cart.length){
        return cart.reduce((acc, c) => (c.price * c.count) + acc, 0)
      }
    }, [cart]),
    getInfo: useCallback(() => {
      if (cart.length){
        return `${cart.length} ${plural(cart.length, 'товар', 'товара', 'товаров')} / ${callbacks.getTotalSum()} ${rub}`
      } else {
        return "Пусто"
      }
    }, [cart]),
    addToCart: useCallback((code) => {
      items.forEach(item => {
       if(item.code === code){
         const index = cart.findIndex(c => c.code === item.code)
         if(index === -1){
           const newState = {
             items: [...items],
             cart: [...cart, {...item, count: 1}]
           }
           store.setState(newState)
         } else {
           const updateCart = [...cart]
           updateCart[index].count += 1
           const newState = {
             items: [...items],
             cart: [...updateCart]
           }
           store.setState(newState)
         }
       }
      })
    }, [cart]),
    removeCartItem: useCallback((code) => {
      let updateCart = [...cart]
      updateCart = updateCart.filter(c => c.code !== code)
      const newState = {
        items: [...items],
        cart: [...updateCart]
      }
      store.setState(newState)
    }, [cart])
  }

  return (
      <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onShow={callbacks.onShow} getInfo={callbacks.getInfo}/>
        <List items={items} onAdd={callbacks.addToCart}/>
      </Layout>
        {isShowCart && (
            <Modal>
              <Cart cart={cart} onClose={callbacks.onClose} totalSum={callbacks.getTotalSum} onRemove={callbacks.removeCartItem}/>
            </Modal>
        )}
      </>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired
}

export default App;
