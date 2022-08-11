import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from "./components/modal"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [isModalVisible, setModalVisible] = React.useState(false);

  const callbacks = {
    onAddItems: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onOpen: useCallback(() => {
      setModalVisible(true)
    }, []),
      onClose: useCallback(() => {
          setModalVisible(false)
      }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls 
          onOpen={callbacks.onOpen} 
          items={store.getState().itemsInCart} 
          totalPrice={store.getState().totalPrice}
          totalCount={store.getState().totalCount}
      />
      <List items={store.getState().items}
            onAddItem={callbacks.onAddItems}
            
      />
      <Modal isVisible={isModalVisible}
             totalPrice={store.getState().totalPrice}
             listItems={store.getState().itemsInCart} 
             onClose={callbacks.onClose}
             onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}

export default App;
