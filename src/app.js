import React, {useCallback, useState} from 'react';

/** Utils */
import {counter} from "./utils";

/** Components */
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
  const [basketOpened, setBasketOpened] = useState(false);

  const callbacks = {
    onAddToBasket: useCallback((item) => {
      store.addItemToBasket(item);
      console.log(store);
    }, []),
    onDropFromBasket: useCallback((code) => {
      store.dropItemFromBasket(code);
    }, []),
    onOpenBasket: useCallback(() => {
      setBasketOpened(true);
    }, [basketOpened]),
    onCloseBasket: useCallback(() => {
      setBasketOpened(false);
    }, [basketOpened]),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        totalSumm={store.getState().totalSumm}
        basketProductsCount={store.getState().basket.length}
        onOpenBasket={callbacks.onOpenBasket}
      />
      <List items={store.getState().items} onAddToBasket={callbacks.onAddToBasket} />
      <Basket
        items={store.getState().basket}
        totalSumm={store.getState().totalSumm}
        isOpened={basketOpened}
        onClose={callbacks.onCloseBasket}
        onDropItem={callbacks.onDropFromBasket}
      />
    </Layout>
  );
}

export default App;
