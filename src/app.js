import React, {useCallback} from 'react';
import Controls from './components/controls';
import Layout from './components/layout';
import List from './components/list';
import Popup from './components/popup';
import TotalPrice from './components/total-price';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const callbacks = {
    onItemDelete: useCallback(code => {
      store.deleteItem(code);
    }, []),
    onAddItemInCart: useCallback(item => {
      store.addInCart(item);
    }, []),
    setPopupVisibility: useCallback(visible => {
      store.setPopupVisibility(visible);
    }, [])
  };

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        onCartOpen={() => callbacks.setPopupVisibility(true)}
        cart={store.getState().cart}
      />
      <List items={store.getState().items} onItemAddInCart={callbacks.onAddItemInCart} />
      {store.getState().cart.visible && (
        <Popup
          head={
            <>
              <h1>Корзина</h1>
              <button onClick={() => callbacks.setPopupVisibility(false)}>Закрыть</button>
            </>
          }
        >
          <List items={store.getState().cart.items} onItemDelete={callbacks.onItemDelete} />
          <TotalPrice price={store.getState().cart.price} />
        </Popup>
      )}
    </Layout>
  );
}

export default App;
