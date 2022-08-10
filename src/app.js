import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/сart";
import plural from 'plural-ru';
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
        cartSum={store.getState().cartInfo.cartSum}/>
      ) : (null)}
      <Controls controlsText={'В корзине:'}
      controlsData={store.getState().cartInfo.itemsCount ? `${store.getState().cartInfo.itemsCount} ${plural(store.getState().cartInfo.itemsCount, 'товар', 'товара', 'товаров')} / ${store.getState().cartInfo.cartSum.toLocaleString('ru-RU')} ₽` : 'пусто'}
      onControlButton={callbacks.onOpenCart}
      buttonText={'Перейти'}/>
      <List items={store.getState().items}
            onButton={callbacks.onAddToCart}
            buttonText={'Добавить'}
      />
    </Layout>
  );
}

export default App;
