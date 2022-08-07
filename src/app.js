import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import AVAILABLE_ITEMS from "./const/const"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addToCart(code);
    }, []),

    onDelete: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),

    onModalToggle: useCallback(() => {
      store.setModal();
    }, [])

  }

  return (
    <Layout head={<h1>Магазин</h1>} isFullScreen>
      <Modal active={store.state.isModalActive} onDelete={callbacks.onDelete} onClose={callbacks.onModalToggle} cart={store.state.cart}>
      </Modal>
      <Controls onClick={callbacks.onModalToggle} cart={store.state.cart} />
      <List
        list={AVAILABLE_ITEMS}
        onClick={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
