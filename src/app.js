import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from './components/ui/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  console.log(store);
  const [visable, setVisable] = useState(false)

  const callbacks = {
    deleteFromCart: useCallback((item) => {
      store.deleteItem(item.code);
    }, []),
    onAddToCart: useCallback((code) => {
      store.createItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
        <Controls setVisable={setVisable} items={store.getState().orders}/>
        <List items={store.getState().items}
              onAddToCart={callbacks.onAddToCart}
        />
        <Modal visable={visable} setVisable={setVisable}>
          <Cart 
            orders={store.getState().orders}
            deleteFromCart={callbacks.deleteFromCart}
            onClose={() => setVisable(false)}
          />
        </Modal>
    </Layout>
  );
}

export default App;
