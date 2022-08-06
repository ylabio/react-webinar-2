import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import BasketPopup from "./components/basket-popup"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [isBasketPopupShown, setIsBasketPopupShown] = useState(false)

  const callbacks = {
    onAdd: useCallback((code, count) => {
      store.addProductToCart(code, count);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteProductFromCart(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      { isBasketPopupShown && (
          <BasketPopup
              items={store.getState().userProducts}
              onBasketPopupClose={() => setIsBasketPopupShown(false)}
              onItemDelete={callbacks.onDeleteItems}
          />
      ) }
      <Controls
          items={store.getState().userProducts}
          onBasketPopupShow={() => setIsBasketPopupShown(true)}
      />
      <List
          items={store.getState().items}
          onItemAdd={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
