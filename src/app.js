import React, {useCallback} from 'react';
import MainPage from './components/main-page';
import Cart from './components/cart';


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
      <MainPage shoppingCart={store.getState().shoppingCart} items={store.getState().items}
                addItemToCartCallback={callbacks.onAddToCart} switchCartCallback={callbacks.switchCart}/>
      {store.getState().cartOpened &&
        <Cart shoppingCart={store.getState().shoppingCart} closeHandler={callbacks.switchCart}
              removeFromCartCallback={callbacks.removeFromCart} totalCartPrice={callbacks.countTotalCartPrice()}/>}
    </div>
  );
}

export default App;
