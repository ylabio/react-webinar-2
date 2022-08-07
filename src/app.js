import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from './components/cart';
import CartList from './components/cart/cart-list';

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

/**
 * Отслеживание изменений в {Store}, если есть, то запись общей суммы в корзине в state
 */
  React.useEffect(() => {
    setPriceSum(Number(getCartItems.map(i => i.price).reduce((a, b) => (a + b) , 0)));
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
      {/* Возможно слишком много пропсов, зато можно сразу задать содержимое модального окна */}
      <Cart active={modalActive}
            setActive={setModalActive}
            headName={'Корзина'}
            footText={'Итого'}
            footTotal={priceSum}
            headBtn={'Закрыть'}>
        <CartList items={getCartItems}
                  onItemDelete={callbacks.onDeleteItems}
        />
      </Cart>
      <Layout head={<h1>Магазин</h1>}>
        <Controls cart={getCartItems}
                  isModalActive={() => setModalActive(true)}/>
        <List items={getItems}
              onItemSelect={callbacks.onSelectItems}
              onItemAdd={callbacks.onAddItems}
        />
      </Layout>
    </div>
  );
}

export default App;
