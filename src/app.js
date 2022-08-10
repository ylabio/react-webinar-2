import React, {useState, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutCart from './components/layout-cart';
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  // Состояние видимости попапа корзины
  const [isCartVisible, setIsCartVisible] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteItemsToCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
    openPopup: useCallback(() => {
      setIsCartVisible(true);
    }, []),
    closePopup: useCallback(() => {
      setIsCartVisible(false);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls store={store.getState()}
                  openPopup={callbacks.openPopup}

        />
        <List items={store.getState().items}
              buttonName='Добавить'
              onItemClick={callbacks.onAddItemToCart}
        />
      </Layout>
      {isCartVisible &&
        <LayoutCart>
          <Cart store={store.getState()}
                closePopup={callbacks.closePopup}
          >
            <List items={store.getState().itemsInCart}
                  buttonName='Удалить'
                  onItemClick={callbacks.onDeleteItemsToCart}
            />
          </Cart>
        </LayoutCart>
      }
    </>
  );
}

export default App;
