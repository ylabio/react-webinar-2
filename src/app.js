import React, {useCallback, useEffect} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import LayoutModal from './components/layout-modal';
import Basket from './components/basket';

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
    changeTotalPrice: useCallback((code) => {
      store.changeTotalPrice(code);
    }, [])
  }
  const basket = store.getState().basket;
  const totalPrice = store.getState().totalPrice;
  const modalVisible = store.getState().modalVisible;

  useEffect(() => {
    callbacks.changeTotalPrice();
  }, [basket])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls changeModalVisible={callbacks.changeModalVisible}
                basket={basket} 
                totalPrice={totalPrice}
      />
      <List items={store.getState().items}
            onAddItemInBasket={callbacks.onAddItemInBasket}
      />
      { 
        modalVisible ?
          <LayoutModal head={<h1>Корзина</h1>}
                        changeModalVisible={callbacks.changeModalVisible}
          >
            <Basket basket={basket}
                    totalPrice={totalPrice}
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
