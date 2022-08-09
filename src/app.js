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

  const [active, setActive] = useState(false)

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, []),
    onActiveModal: useCallback((value) => {
      setActive(value)
    }, []),
  }

  return (
    <div>
      <Layout head={<h1>Магазин</h1>}>
        <Controls cart={store.getState().shoppingCart} onClick={callbacks.onActiveModal}/>
        <List items={store.getState().items}
              onAction={callbacks.onAddItem}
        />
      </Layout>
      <Modal cart={store.getState().shoppingCart}
             active={active}
             onClick={callbacks.onActiveModal}
             onDeleteItem={callbacks.onDeleteItem}/>
    </div>
  );
}

export default App;
