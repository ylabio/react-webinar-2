import React, {useCallback, useMemo} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    toggleModal: useCallback(() => {
      store.toggleModal();
    }, []),
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>} modal={<Modal isModal={store.getState().isModal} toggleModal={callbacks.toggleModal} head={<h1>Корзина</h1>} />} >
      <Controls onCart={callbacks.toggleModal} />
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}

export default App;
