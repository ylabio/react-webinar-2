import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModal, setModal] = useState(false);

  const callbacks = {
    onButtonModalClick: useCallback((code) => {
      setModal(code);
    }, [setModal]),
    onAddProduct: useCallback((code) => {
      store.addProduct(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls 
          basket={store.getState().basket} 
          onClick={callbacks.onButtonModalClick}
        />
        <List 
          items={store.getState().items}
          onAddProduct={callbacks.onAddProduct}
        />
      </Layout>
      <Modal
        isVisible={isModal}
        basket={store.getState().basket}
        onDelete={callbacks.onDeleteItems}
        onClose={callbacks.onButtonModalClick}
      />
    </>
  );
}

export default App;
