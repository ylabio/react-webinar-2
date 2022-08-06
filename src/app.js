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
  const [cart, setCart] = useState([]);
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
      /*
      * решение нашел по этому адресу:
      * https://www.stackfinder.ru/questions/60536035/how-to-increase-quantity-of-the-item-if-it-is-already-added-in-shopping-cart-in
      * */
      const items = store.getState().items
      items.forEach(item => {
       if(item.code === code){
         const index = cart.findIndex(c => c.code === item.code)
         if(index === -1){
           setCart(prevState => [
               ...prevState,
             {...item, count: 1}
           ])
         } else {
           const updateCart = [...cart]
           updateCart[index].count += 1
           setCart(updateCart)
         }
       }
      })
    }, [cart]),
    removeCartItem: useCallback((code) => {
      let updateCart = [...cart]
      updateCart = updateCart.filter(c => c.code !== code)
      setCart(updateCart)
    }, [cart])
  }

  return (
      <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onShow={callbacks.onShow} getInfo={callbacks.getInfo}/>
        <List items={store.getState().items} onAdd={callbacks.addToCart}/>
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
