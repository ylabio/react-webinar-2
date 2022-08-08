import React, { useCallback, useState } from 'react';
import Controls from "./components/controls/Controls";
import List from "./components/list/List";
import Layout from "./components/layout/Layout";
import { counter } from "./utils";
import ModalWindow from './components/modal/ModalWindow';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const [countProduct, setCountProduct] = useState()
  const callbacks = {
    setModalStatus: useCallback(() => {
      store.setModalStatus()
    }, []),
    onAddProduct: useCallback((code) => {
      store.onAddProduct(code);
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls product={store.getState().cart} modalStatus={store.getState().modalStatus} setModalStatus={callbacks.setModalStatus} />
      <List items={store.getState().items}
        onAddProduct={callbacks.onAddProduct}
      />
      <ModalWindow setModalStatus={callbacks.setModalStatus} modalStatus={store.getState().modalStatus} products={store.getState().cart} />
    </Layout>
  );
}

export default App;
