import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [visibleBasket, setVisibleBasket] = useState(false)
  const {items, basket, sum, amount} = store.getState()

  const callbacks = {
    closeBasket: useCallback(() => {
      setVisibleBasket(false)
    }, [visibleBasket]),
    openBasket: useCallback(() => {
      setVisibleBasket(true)
    }, [visibleBasket]),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openBasket={callbacks.openBasket} amount={amount} sum={sum}/>
      <Basket items={basket} visible={visibleBasket} closeBasket={callbacks.closeBasket}
              onItemDelete={callbacks.onDeleteItems} sum={sum}/>
      <List items={items}
            addItemInBasket={callbacks.onSelectItems}
      />
    </Layout>
  );
}

export default App;
