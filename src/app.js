import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Item from './components/item/index'


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    callModal: useCallback((bool) => {
      setModalActive(bool);
    }, []),
    addToCart: useCallback((item) => {
      store.addToCart(item);
    }, []),
    removeFromCart: useCallback((item) => {
      store.removeFromCart(item);
    })
  }

  const items = store.getState().items.map(item =>{
    return (
    <div key={item.code}>
      <Item item={item}
      itemNumber={item.code}
      buttonAction={callbacks.addToCart}/>
    </div>)
    });

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>} fullHeight={true}>
      <Controls cart={store.getState().cart} callModal={callbacks.callModal}/>
      <List>{items}</List>
      <Modal active={modalActive} callModal={callbacks.callModal} cart={store.getState().cart} callback={callbacks.removeFromCart}/>
    </Layout>

  );
};

export default App;
