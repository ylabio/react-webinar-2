import React, {useCallback, useState} from 'react';
import BasketList from "./components/basket-list";
import Layout from "./components/layout";

import Basket from './components/basket';
import BasketModal from './components/basket-modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [visibilityBasket, setVisibilityBasket] = useState(false);

  const callbacks = {
    onAddItemToBasket: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),
    onDeleteItemToBasket: useCallback((item) => {
      store.deleteItemToBasket(item);
    }, [store])
  }

  return (
    <>
      {
        visibilityBasket 
        ? 
        <BasketModal 
          onVisibility={() => setVisibilityBasket(false)}
          items={store.getState().product}
          price={store.getState().price}
          onDeleteItemToBasket={callbacks.onDeleteItemToBasket} 
        /> 
        : null
      }
      <Layout head={<h1>Магазин</h1>}>
        <Basket 
          onVisibility={() => setVisibilityBasket(true)}
          price={store.getState().price}
          count={store.getState().count}
        />
        <BasketList 
          items={store.getState().items}
          onAddItemToBasket={callbacks.onAddItemToBasket}
        />
      </Layout>
    </>
  );
}

export default App;
