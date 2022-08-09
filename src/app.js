import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import Item from "./components/item";
import ModalLayout from "./components/modal-layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    onItemAdd: useCallback((code) => {
      store.addItem(code);
    }, []),
    onItemRemove: useCallback((code) => {
      store.removeItem(code);
    }, []),
    onCartOpen: useCallback(() => {
      setIsCartOpen(true);
    }, [isCartOpen, setIsCartOpen]),
    onCartClose: useCallback(() => {
      setIsCartOpen(false);
    }, [isCartOpen, setIsCartOpen]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        cartItems={store.getState().cartItems}
        totalPrice={store.getTotalPrice()}
        onCartOpen={callbacks.onCartOpen}
      />
      <List>
        {store.getState().items.map((item) =>
          <Item item={item} onClick={callbacks.onItemAdd} key={item.code} />
        )}
      </List>
      {
        isCartOpen &&
        <ModalLayout head={<h2>Корзина</h2>} onClose={callbacks.onCartClose}>
          <Cart
            cartItems={store.getState().cartItems}
            totalPrice={store.getTotalPrice()}
            onItemRemove={callbacks.onItemRemove}
          />
        </ModalLayout>
      }
    </Layout>
  );
}

export default App;
