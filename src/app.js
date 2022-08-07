import React, {useState, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  // Состояние видимости попапа корзины
  const [popupState, setPopupState] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteItemsToCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
    openPopup: useCallback(() => {
      setPopupState(true);
    }, []),
    closePopup: useCallback(() => {
      setPopupState(false);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls items={store.getState().itemsInCart}
                  openPopup={callbacks.openPopup}

        />
        <List items={store.getState().items}
              buttonName='Добавить'
              onItemClick={callbacks.onAddItemToCart}
        />
      </Layout>
      <Cart items={store.getState().itemsInCart}
            isVisible={popupState}
            closePopup={callbacks.closePopup}
      >
        <List items={store.getState().itemsInCart}
              buttonName='Удалить'
              onItemClick={callbacks.onDeleteItemsToCart}
        />
      </Cart>
    </>
  );
}

export default App;
