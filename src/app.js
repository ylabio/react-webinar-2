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

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>} fullHeight={true}>
      <Controls cart={store.getState().cart} callModal={callbacks.callModal}/>
      <List items={store.getState().items}
            callback={callbacks.addToCart}
      />
      <Modal active={modalActive} callModal={callbacks.callModal} cartItems={store.getState().cart} callback={callbacks.removeFromCart}/>
    </Layout>

  );
};

export default App;
