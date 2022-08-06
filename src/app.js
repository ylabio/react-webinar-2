import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback((code, title, price, amount) => {
      store.createItem({ code: code, title: title, price: price, amount: amount });
    }, []),
    priceFormation: useCallback((price) => {
      return (price).toLocaleString('ru');
    }, []),
    onDeleteItems: useCallback((code, amount, price) => {
      store.deleteItem(code, amount, price);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onDeleteItems={callbacks.onDeleteItems}
                priceFormation={callbacks.priceFormation}
                itemsBasket={store.getState().itemsBasket}
                counterBasketItemsSumm={store.summ}
                counterBasketItemsAmount={store.counter}
      />

      <List items={store.getState().items}
            onAdd={callbacks.onAdd}
            priceFormation={callbacks.priceFormation}
      />
    </Layout>
  );
}

export default App;
