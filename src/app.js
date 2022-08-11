import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal/index";

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
    <Layout head={<h1>Магазин</h1>}>
      <Modal active={store.state.isModalActive} onDelete={callbacks.onDelete} onClose={callbacks.onModalToggle} cart={store.state.cart} getMeta={store.getMeta}>
      </Modal>
      <Controls onClick={callbacks.onModalToggle} cart={store.state.cart} getMeta={store.getMeta} />
      <List
        list={store.state.AVAILABLE_ITEMS}
        onClick={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
