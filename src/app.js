import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import ModalHeader from './components/modal header';
import ModalList from './components/modal list';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {

  const [order, setToOrder] = useState(null);
  const [isModalActive, setModalActive] = useState(false);

  const callbacks = {
    onAddItem: useCallback((item, amount) => {  
      store.addItem(item, amount);
      setToOrder(store.showOrder())
    }, []),
    getOrder: useCallback(() => {
      return store.getOrder();
    }, []),
    showOrder: useCallback(() => {
      store.showOrder();
    }, []),
  }

  return (
    <>
    {isModalActive
        ? <Modal>  
          <ModalHeader setModalActive={setModalActive}/>
          <ModalList callbacks={callbacks}/> 
        </Modal>
        : null}
      <Layout head={<h1>Приложение на чистом JS</h1>}>
        <Controls order={order} setModalActive={setModalActive}/>
        <List items={store.getState().items} callbacks={callbacks}/>
      </Layout>
    </>    
  );
}

export default App;
