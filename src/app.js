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
    onGoToBasket: useCallback(() => {
    //
    }, []),
    onAddQuantity: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onGoToBasket={callbacks.onGoToBasket}/>
      <List items={store.getState().items}
            onAddQuantity={callbacks.onAddQuantity}
      />
    </Layout>
  );
}

export default App;
