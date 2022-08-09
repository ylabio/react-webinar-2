import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [viewModal, setViewModal] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [totalPrice, setTotalPrice] = React.useState(store.state.totalPrice)

  React.useEffect(() => {
    setCount(store.state.basketItems.length)
    setTotalPrice(store.state.totalPrice)
  }, [store.state.basketItems])

  const callbacks = {
    onItemAddBasket: useCallback((code, item) => {
      store.addItem(code, item);
    }, []),
    onItemDeleteBasket: useCallback((removeItem) => {
      store.deleteItem(removeItem);
    }, []),
    onViewModal: useCallback(() => {
      store.openModal(viewModal, setViewModal)
    }, []),
    onCloseModal: useCallback(() => {
      store.closeModal(viewModal, setViewModal)
    }, [viewModal]),
  }

  return (
    <Layout head = {<h1>Магазин</h1>}>
      <Controls 
          openModal = {callbacks.onViewModal}
          count = {count}
          totalPrice = {totalPrice}
          basketItems = {store.state.basketItems}
      />
      <List 
          items = {store.getState().items}
          onItemAddBasket = {callbacks.onItemAddBasket}
      />
      {
        viewModal
      ?
        <Modal
          closeModal = {callbacks.onCloseModal}
          basketItems = {store.state.basketItems}
          deleteItemFromBasket = {callbacks.onItemDeleteBasket}
          totalPrice = {totalPrice}
        />
      :
        null
      }
    </Layout>
  );
}

export default App;
