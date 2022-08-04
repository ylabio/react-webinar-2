import React, {useCallback} from 'react';
import Controls from './components/controls';
import Layout from './components/layout';
import List from './components/list';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const callbacks = {
    onDeleteItems: useCallback(code => {
      store.deleteItem(code);
    }, []),
    onAddItemInCart: useCallback(item => {
      store.addInCart(item);
    }, [])
  };

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onCartOpen={() => {}} cart={store.getState().cart} />
      <List
        items={store.getState().items}
        onItemDelete={callbacks.onDeleteItems}
        onItemAddInCart={callbacks.onAddItemInCart}
      />
    </Layout>
  );
}

export default App;
