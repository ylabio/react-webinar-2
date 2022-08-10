import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from './components/cart';
import CartList from './components/cart/cart-list';
import {arrFromSet} from './utils.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const getItems = store.getState().items;
  const getCartItems = store.getState().cartItems;

  const [modalActive, setModalActive] = React.useState(false);
  const [priceSum, setPriceSum] = React.useState(0);
  const [itemsSum, setItemsSum] = React.useState(0);

/**
 * Отслеживание изменений в {Store}
 */
  React.useEffect(() => {
    setPriceSum(Number(getCartItems.map(i => i.price).reduce((a, b) => (a + b) , 0)));
    setItemsSum(Number(arrFromSet(getCartItems).length));
  }, [getCartItems]);

  const callbacks = {
    onAddItems: React.useCallback((code) => {
      store.addItem(code)
    }, []),
    onSelectItems: React.useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: React.useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <div>
      <Cart isActive={modalActive}
            setActive={setModalActive}
            headName={'Корзина'}
            footTotal={priceSum.toLocaleString('ru-RU')}>
        <CartList items={getCartItems}
                  onItemDelete={callbacks.onDeleteItems}
        />
      </Cart>
      <Layout head={<h1>Магазин</h1>}>
        <Controls isModalActive={() => setModalActive(true)}
                  getItemsSum={itemsSum}
                  getPriceSum={priceSum}/>
        <List items={getItems}
              onItemSelect={callbacks.onSelectItems}
              onItemAdd={callbacks.onAddItems}
        />
      </Layout>
    </div>
  );
}

export default App;
