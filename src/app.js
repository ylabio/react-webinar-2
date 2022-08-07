import React, {useCallback} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddToCartItem: useCallback((product) => {
      store.addToCart(product);
    }, []),
    onDeleteToCartItem: useCallback((product) => {
      store.deleteToCart(product);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                onDeleteToCartItem={callbacks.onDeleteToCartItem}/>
      <List items={store.getState().items}
            onButton={callbacks.onAddToCartItem} titleButton="Добавить"/>
    </Layout>
  );
}

export default App;
