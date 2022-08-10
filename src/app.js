import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/сart";
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onOpenCart: useCallback(() => {
      setCartVisibility(true);
    }, []),
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onRemoveFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, [])

  }

  const [cartVisible, setCartVisibility] = useState(false);

  return (
    <Layout head={<h1>Магазин</h1>}>
      {cartVisible ? (
        <Cart head={<h1>Корзина</h1>}
        cart={store.getState().cart}
        setVisibility={setCartVisibility}
        onButton={callbacks.onRemoveFromCart}
        bottomText={store.calculateCartSum()}/>
      ) : (null)}
      <Controls controlsText={'В корзине:'} controlsData={store.calculateCartItemsSum()} onControlButton={callbacks.onOpenCart} buttonText={'Перейти'}/>
      <List items={store.getState().items}
            onButton={callbacks.onAddToCart}
            buttonText={'Добавить'}
      />
    </Layout>
  );
}

export default App;
