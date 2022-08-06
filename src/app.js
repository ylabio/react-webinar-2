import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const [modalActive, setModalActive] = useState(false)

  const callbacks = {
    onAdd: useCallback((code) => {
      store.createItem({ code });
    }, []),
    summationCart : useCallback(() => {
     return store.summationCart();
    }, [store.state.itemsInCart]),
    onDeleteItems: useCallback((code) => {
      console.log('onDeleteItems ==>', code);
      store.deleteItem(code)
    }, []),
  }
  console.log(store)

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls setActive={setModalActive} summationCart={callbacks.summationCart} />
        <List items={store.getState().items}
          btnAction={callbacks.onAdd}
          btnActionName={'Добавить'}
        />
      </Layout>
      <Modal active={modalActive} setActive={setModalActive}>
        <List items={store.getState().itemsInCart}
          // onItemSelect={callbacks.onSelectItems}
          btnAction={callbacks.onDeleteItems}
          btnActionName={'Удалить'}
          model={'Modal'}
          con={console.log}

        />
      </Modal>
    </>
  );
}

export default App;

