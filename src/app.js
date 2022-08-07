import React, {useCallback, useEffect, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartState, setCartState] = useState({amount: 0, total: 0});

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onOpenCart: useCallback(() => {
      setIsModalOpen(true);
    })
  }

  useEffect(() => {
    const { cart } = store.getState();
    if (cart.length) {
      const amount =  cart.length === 1
        ? cart[0].amount
        : cart.reduce((total, next, index) => (
          index === 1
            ? total.amount + next.amount
            : total + next.amount
        ));
      const total = cart.length === 1
        ? Math.round(cart[0].price * cart[0].amount) 
        : cart.reduce((total, next, index) => (
          index === 1
            ? (total.price * total.amount) + (next.price * next.amount)
            : total + (next.price * next.amount)
        ))
      setCartState({amount, total});
    }
  }, [store.getState().cart])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onClick={callbacks.onOpenCart}
                children={
                  (!!cartState.amount) && (<Cart amount={cartState.amount}
                                                 total={cartState.total} 
                                            />)
              }
      />
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
            onItemAddToCart={callbacks.onAddToCart}
      />
    </Layout>
  );
}

export default App;
