import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter, counterCart} from "./utils";
import Modal from './components/modal';
import Cart from './components/cart';


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
   }

   const[show, setShow] = useState(false)

  return (
    <div>
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                totalPrice={store.getState().totalPrice}
                totalCount={store.getState().totalCount}
                onOpen={() => setShow(true)}
      />
      <List items={store.getState().items}
            onAdd={callbacks.onAdd}
      />
    </Layout>
    {show &&
    <Modal head={'Корзина'}
             onClose={() => setShow(false)}>
        <Cart items={store.getState().cart}
              onDeleteItems={callbacks.onDeleteItems} 
              totalPrice={store.getState().totalPrice}/>
    </Modal>}
    </div>
  );
}

export default App;
