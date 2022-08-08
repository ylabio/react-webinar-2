import React, {useCallback} from 'react';
import Layout from './components/layout';
import Controls from './components/controls';
import List from './components/list';
import CartSummary from './components/cart-summary';
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    removeFromCart: useCallback((code) => {
      store.removeItemFromCart(code)

    }, []),
    switchCart: useCallback(() => store.switchCart(), []),
    countTotalCartPrice: useCallback(() => {
      let output = 0
      store.getState().shoppingCart.forEach((item) => output += item.amount * item.price)
      return output
    }, [store.state.shoppingCart])
  }

  return (
    <div className="App">
      <Layout head={<h1>Магазин</h1>}>
        <Controls itemsInCart={store.getState().itemsInCart} cartPrice={store.getState().cartPrice}
                  switchCart={callbacks.switchCart}/>
        <List items={store.getState().items}
              onItemClickCallback={callbacks.onAddToCart}
              itemType="shop"
        />
      </Layout>
      {store.getState().cartOpened &&
        <Modal head={<h1>Корзина</h1>} closeHandler={callbacks.switchCart}>
          <div style={{height: "74px"}}/>
          <List items={store.getState().shoppingCart}
                onItemClickCallback={callbacks.removeFromCart}
                itemType="cart"
          />
          <CartSummary sum={callbacks.countTotalCartPrice()}/>
        </Modal>}
    </div>
  );
}

export default App;
