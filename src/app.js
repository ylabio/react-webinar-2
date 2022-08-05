import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddToCartItem: useCallback((code) => {
      store.onAddToCart(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls items={store.getState().items} cart={store.getState().cart}/>
      <List items={store.getState().items}
            onItemAddToCart={callbacks.onAddToCartItem}/>
    </Layout>
  );
}

export default App;
