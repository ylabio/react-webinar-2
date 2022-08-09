import React, {useCallback, useEffect} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutModal from './components/layout-modal';
import Basket from './components/basket';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    changeModalVisible: useCallback((isVisible) => { 
      store.changeModalVisible(isVisible);
    }, []),
    onAddItemInBasket: useCallback((code) => {
      store.addItemInBasket(code);
    }, []),
    deleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    changeTotalPrice: useCallback(() => {
      store.changeTotalPrice();
    }, []),
    getNumUniqueItems: useCallback(() => {
      store.getNumUniqueItems();
    }, [])
  }

  const basket = store.getState().basket;
  const totalPrice = store.getState().totalPrice;
  const modalVisible = store.getState().modalVisible;
  const numUniqueItems = store.getState().numUniqueItems;

  const renders = {
    item: useCallback((item) => {
      return <Item item={item}
                   onAddItemInBasket={callbacks.onAddItemInBasket}
             />
    }, [callbacks.onAddItemInBasket])
  }

  useEffect(() => {
    callbacks.changeTotalPrice();
    callbacks.getNumUniqueItems(); 
  }, [basket])
 
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls changeModalVisible={callbacks.changeModalVisible}
                numUniqueItems={numUniqueItems} 
                totalPrice={totalPrice}
      />
      <List items={store.getState().items}
            itemForRender={renders.item}
      />
      { 
        modalVisible ?
          <LayoutModal head={<h1>Корзина</h1>}
                       changeModalVisible={callbacks.changeModalVisible}
          >
            <Basket basket={basket}
                    totalPrice={totalPrice}
                    numUniqueItems={numUniqueItems}
                    deleteItem={callbacks.deleteItem}
            />
          </LayoutModal>
      :
          null
      }
    </Layout>
  );
}

export default App;
