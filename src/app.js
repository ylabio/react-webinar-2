import React, {useCallback} from 'react';
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

  const callbacks = {
    onAmountIncrease: useCallback((code) => {
      store.amountIncrease(code);
    }, []),
    onCartOpen: useCallback(() => {
      store.openCart();
    }, []),
    onCartClose: useCallback(() => {
      store.closeCart();
    }, []),
    onItemDelete: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  const isCartOpen = store.getState().isCartOpen;

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        cartItems={store.getState().cartItems}
        totalPrice={store.getTotalPrice()}
        onCartOpen={callbacks.onCartOpen}
      />
      <List>
        {store.getState().items.map((item) =>
          <Item item={item} onClick={callbacks.onAmountIncrease} key={item.code} />
        )}
      </List>
      {
        isCartOpen &&
        <ModalLayout head={<h2>Корзина</h2>} onClose={callbacks.onCartClose}>
          <Cart
            cartItems={store.getState().cartItems}
            totalPrice={store.getTotalPrice()}
            onItemDelete={callbacks.onItemDelete}
          />
        </ModalLayout>
      }
    </Layout>
  );
}

export default App;
