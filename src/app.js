import React, {useCallback, useEffect} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutBasket from './components/layout-basket';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    changeBasketVisible: useCallback((isVisible) => { 
      store.changeBasketVisible(isVisible);
    }, []),
    onAddItemInBasket: useCallback((code) => {
      store.addItemInBasket(code);
    }, []),
    deleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    changeTotalPrice: useCallback((code) => {
      store.changeTotalPrice(code);
    }, [])
  }
  const basket = store.getState().basket;
  const totalPrice = store.getState().totalPrice;
  const basketVisible = store.getState().basketVisible;

  useEffect(() => {
    callbacks.changeTotalPrice();
  }, [basket])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls changeBasketVisible={callbacks.changeBasketVisible}
                basket={basket} 
                totalPrice={totalPrice}
      />
      <List items={store.getState().items}
            onAddItemInBasket={callbacks.onAddItemInBasket}
      />
      <LayoutBasket head={<h1>Корзина</h1>}
                    changeBasketVisible={callbacks.changeBasketVisible}
                    basketVisible={basketVisible}>
        <Basket basket={basket}
                totalPrice={totalPrice}
                deleteItem={callbacks.deleteItem}
        />
      </LayoutBasket>
    </Layout>
  );
}

export default App;
