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
    onPushItems: useCallback((code, title, price) => {
      store.addItem(code, title, price)
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
        onDelete={callbacks.onDeleteItems}
        sum={store.getState().sum}  
        amount={store.getState().amountOfItems}
      />
      <Controls 
        onToggle={callbacks.onModalToggle} 
        sum={store.getState().sum}  
        amount={store.getState().amountOfItems}
      />
      <List 
        items={store.getState().items}
        onItemPush={callbacks.onPushItems}
      />
    </Layout>
  );
}

export default App;
