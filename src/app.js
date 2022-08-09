import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [activeModal, setActiveModal] = useState(false)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, []),
    onToggleModal: useCallback(() => {
      setActiveModal(activeModal => !activeModal)
    }, []),
  }

  return (
    <div>
      <Layout head={<h1>Магазин</h1>}>
        <Controls cart={store.getState().shoppingCart} onToggleModal={callbacks.onToggleModal}/>
        <List items={store.getState().items}
              onAction={callbacks.onAddItem}
        />
      </Layout>
      {activeModal && <Modal cart={store.getState().shoppingCart}
             onToggleModal={callbacks.onToggleModal}
             onDeleteItem={callbacks.onDeleteItem}/>
      }
    </div>
  );
}

export default App;
