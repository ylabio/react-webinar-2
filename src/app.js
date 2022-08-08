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
      onAddToCart: useCallback((code) => {
          store.addToCart(code);
      }, []),
      onDeleteFromCart: useCallback((code) => {
          store.deleteFromCart(code);
      }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
          items={store.getState().cart}
          onItemDeleteFromCart={callbacks.onDeleteFromCart}
      />
        <List
            items={store.getState().items}
            onItemAddToCart={callbacks.onAddToCart}
        />
    </Layout>
  );
}

export default App;
