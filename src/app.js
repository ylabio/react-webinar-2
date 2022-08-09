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
  const sumBasket=store.getState().basket.reduce((acc,curr)=>{
    acc.sum+=(curr.price*curr.count)
    acc.amount+=1
    return acc
  },{amount:0,sum:0})

  return (
      <Layout head={<h1>Магазин</h1>}>
        <Controls openBasket={callbacks.openBasket} amount={sumBasket.amount} sum={sumBasket.sum}/>
        <Basket items={store.getState().basket} visible={visibleBasket} closeBasket={callbacks.closeBasket}
                onItemDelete={callbacks.onDeleteItems} sum={sumBasket.sum}/>
        <List items={store.getState().items}
              addItemInBasket={callbacks.onSelectItems}
        />
      </Layout>
  );
}

export default App;
