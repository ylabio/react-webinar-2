import React, { useCallback, useState } from 'react';
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
  const [modalStatus, setModal] = useState(false)


  const callbacks = {
    setModalStatus: useCallback(() => {
      setModal(!modalStatus)
    }, [modalStatus]),
    onAddProduct: useCallback((code) => {
      store.onAddProduct(code);
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls product={store.getState().cart} modalStatus={modalStatus} setModalStatus={callbacks.setModalStatus} />
      <List items={store.getState().items}
        onAddProduct={callbacks.onAddProduct}
      />
      <ModalWindow setModalStatus={callbacks.setModalStatus} modalStatus={modalStatus} products={store.getState().cart} />
    </Layout>
  );
}

export default App;
