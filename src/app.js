
import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal"

import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [showModal , setShowModal] = useState(false);

  const callbacks = {
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

    onPushItemToCart : useCallback((code) => {
      store.pushItemToCart(code);
    }, [])
  }

  const changeShowModal = () => {
    setShowModal(!showModal);
  }

  return (
    <>
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                changeShowModal={changeShowModal}
      />
      <List items={store.getState().items}
            onItemAction={callbacks.onPushItemToCart}
            btnTxt ='Добавить'
      />
    </Layout>
    {showModal &&
     <Modal changeShowModal={changeShowModal} 
            items={store.getState().cart}
            onItemAction={callbacks.onDeleteItems}
            btnTxt='Удалить'
     />}
    </>
  );
}

export default App;