import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
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
    addItemInBasket: useCallback((el, count) => {
      store.addItemInBasket({el, count})
    }, []),
    deleteItemInBasket: useCallback((code) => {
      store.deleteItemInBasket(code)
    }, [])
  }

  return (
      <Layout head={<h1>Магазин</h1>}>
        <Controls openBasket={callbacks.openBasket}/>
        <Basket items={store.getState().basket} visible={visibleBasket} closeBasket={callbacks.closeBasket}
                onItemDelete={callbacks.deleteItemInBasket}/>
        <List items={store.getState().items}
              addItemInBasket={callbacks.addItemInBasket}
        />
      </Layout>
  );
}

export default App;
