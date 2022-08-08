import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Layout from "./components/layout";

import BasketPreview from './components/basket-preview';
import BasketModal from './components/basket-modal';

import Item from './components/item';
import BasketItem from './components/basket-item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddItemToBasket: useCallback((item) => {
      store.addItemToBasket(item.code);
    }, [store]),
    onDeleteItemToBasket: useCallback((item) => {
      store.deleteItemToBasket(item.code);
    }, [store])
  }

  return (
    <>
      {
        store.getState().modal === 'basket'
        ? 
        <BasketModal 
          onVisibility={() => store.handleModal('')}
          items={store.getState().basket.product.map((item) => (
            <li className='List-item' key={item.code}>
              <BasketItem item={item} callback={callbacks.onDeleteItemToBasket}/>
            </li>
          ))}
          price={store.getState().basket.price}
        /> 
        : null
      }
      <Layout head={<h1>Магазин</h1>}>
        <BasketPreview 
          onVisibility={() => store.handleModal('basket')}
          price={store.getState().basket.price}
          count={store.getState().basket.count}
        />

        <List 
          items={store.getState().items.map((item) => (
          <li className='List-item' key={item.code}>
            <Item item={item} callback={callbacks.onAddItemToBasket}/>
          </li>))}
        />
      </Layout>
    </>
  );
}

export default App;
