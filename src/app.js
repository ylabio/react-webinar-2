import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Popup from "./components/popup";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [isBasketPopupShown, setIsBasketPopupShown] = useState(false);

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
          <Popup
              head={<h1>Корзина</h1>}
              onBasketPopupClose={() => setIsBasketPopupShown(false)}
          >
              <Basket
                  items={store.getState().userProducts}
                  onItemDelete={callbacks.onDeleteItems}
              />
          </Popup>
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
