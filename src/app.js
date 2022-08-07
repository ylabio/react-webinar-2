import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Item from "./components/item";
import BasketTotal from "./components/basket-total";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onAddToBasket: useCallback((code) => store.onAddToBasket(code), [store]),
    onDeleteFromBasket: useCallback((code) => store.onDeleteFromBasket(code), []),
    onOpenModal: useCallback(() => setModalOpen(true), [setModalOpen]),
    onCloseModal: useCallback(() => setModalOpen(false), [setModalOpen])
  };
  const renderFunctions = {
    item: useCallback((item) => {
      return <Item item={item} onChange={callbacks.onAddToBasket} btnTitle={'Добавить'}/>
    }, [callbacks.onAddToBasket]),
    itemBasket: useCallback((item) => {
      return <Item item={item} onChange={callbacks.onDeleteFromBasket} amountRender={true} btnTitle={'Удалить'}/>
    })
  };

  return (
      <>
        <Layout head={<h1>Приложение на чистом JS</h1>}>
          <Controls onAdd={callbacks.onOpenModal} amount={store.getState().basket.amount} price={store.getState().basket.price}/>
          <List items={store.getState().items}
                renderItem={renderFunctions.item}
          />
        </Layout>
        {modalOpen && <Modal title={'Корзина'}

                                   onClose={callbacks.onCloseModal}
                                   total={<BasketTotal title={'Итого'} amount={store.getState().basket.amount} price={store.getState().basket.price}/>}>
          <List items={store.getState().basket.items}
                renderItem={renderFunctions.itemBasket}
          />
        </Modal>}
      </>
  );
}

export default App;
