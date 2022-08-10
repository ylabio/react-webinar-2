import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal"
import {counter} from "./utils";
import Cart from "./components/cart";

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
                cartCost={store.getState().cartCost}
                goodsAmount={store.getState().goodsAmount}
      />
      <List items={store.getState().items}
            onItemAction={callbacks.onPushItemToCart}
            btnTxt ='Добавить'
      />
    </Layout>
    {showModal &&
     <Modal closeBtn={changeShowModal} 
            head={<h1>Корзина</h1>}
      >
        <Cart items={store.getState().cart}
              deleteItem={callbacks.onDeleteItems}
              cartCost={store.getState().cartCost}
        />
      </Modal>
     }
    </>
  );
}

export default App;