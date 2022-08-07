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
  const [isOpen, changeModal] = useState(false);

  const callbacks = {
    openModal: useCallback(() => changeModal(true), [changeModal]),
    closeModal: useCallback(() => changeModal(false), [changeModal]),
    onAddItems: useCallback((code) => store.addItem(code), []),
    onDeleteItems: useCallback((code) => store.deleteItem(code), []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls openModal={callbacks.openModal} 
                  amount={store.getState().cart.amount} 
                  price={store.getState().cart.price}/>
        <List items={store.getState().items}
              btnClick={callbacks.onAddItems}
              btnLabbel={'Добавить'}
        />
      </Layout>
      {isOpen && <Modal closeModal={callbacks.closeModal} 
                        amount={store.getState().cart.amount} 
                        price={store.getState().cart.price}>
        <List items={store.getState().cart.items}
              btnClick={callbacks.onDeleteItems}
              btnLabbel={'Удалить'}
        />
      </Modal>}
    </>
  );
}

export default App;
