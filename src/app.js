import React, {useCallback} from 'react';
import Controls from "./components/controls/Controls";
import List from "./components/list/List";
import Layout from "./components/layout/Layout";
import {counter} from "./utils";
import ModalWindow from './components/modal/ModalWindow';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    setModalStatus: useCallback(() => {
      store.setModalStatus()
    }, []),
    onAddProduct: useCallback((code) => {
      store.selectItem(code);
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openModal={callbacks.setModalStatus}/>
      <List items={store.getState().items}
            onAddProduct={callbacks.onAddProduct}
      />
      <ModalWindow products={store.getState().cart}/>
    </Layout>
  );
}

export default App;
