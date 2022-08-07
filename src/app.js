import React, {useCallback} from 'react';
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

  const callbacks = {
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onPushItems: useCallback((code) => {
      store.addItem(code)
    }, []),
    onModalToggle: useCallback(() => {
      store.modalToggle()
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Modal 
          toggle={store.getState().modalToggle}
          chosenItems={store.getState().chosenItems}
          onToggle={callbacks.onModalToggle}
          onItemDelete={callbacks.onDeleteItems}
      />
      <Controls 
        onToggle={callbacks.onModalToggle} 
        chosenItems={store.getState().chosenItems}
      />
      <List items={store.getState().items}
            onItemDelete={callbacks.onDeleteItems}
            onItemPush={callbacks.onPushItems}
      />
    </Layout>
  );
}

export default App;
