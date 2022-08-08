import React, { useCallback } from 'react';
import Controls from "./components/controls/Controls";
import Layout from "./components/layout/Layout";
import List from "./components/list/List";
import ModalWindow from './components/modal/ModalWindow';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const callbacks = {
    openModal: useCallback(() => {
      store.setModalStatus()
    }, []),

    onAddProduct: useCallback((code) => {
      store.onAddProduct(code);
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls product={store.getState().cart} modalStatus={store.getState().modalStatus} setModalStatus={callbacks.openModal} />
      <List items={store.getState().items}
        onAddProduct={callbacks.onAddProduct}
      />
      <ModalWindow setModalStatus={callbacks.setModalStatus} modalStatus={store.getState().modalStatus} products={store.getState().cart} />
    </Layout>
  );
}

export default App;
