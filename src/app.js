import React, {useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import ShopCart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [showCart, setShowCart] = useState(false);
  const cn = bem('Cart');

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addItem(code);
    }, []),
    onOpen: useCallback(() => {
        setShowCart(!showCart);
    }, []),
    onDelete: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>} layout='Layout'>
      <Controls onOpen={callbacks.onOpen}
                cartQty={store.getState().shoppingCartQty} 
                cartTotal={store.getState().shoppingCartTotal}
      />
      <List items={store.getState().items} onItemAdd={callbacks.onAdd} />
      {showCart && 
        <ShopCart header='Корзина' onClose={()=> setShowCart(!showCart)}>
          <List items={store.getState().shoppingCart} onDelete={callbacks.onDelete} />
          {(store.getState().shoppingCartQty > 0) 
            && <div className={cn('footer')}>
                 <span>Итого</span>
                 <span className={cn('total')}>
                   {store.getState().shoppingCartTotal
                                    .toLocaleString('ru-RU') 
                                    + ' \u20bd'}
                 </span>
              </div>
              }
        </ShopCart>
        }
    </Layout>
  );
}

export default App;
