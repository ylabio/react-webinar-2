import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import Total from './components/total';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isModal, setIsModal] = useState({
    modalBasket: false
  });

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addToBasket(item.code, item.title, item.price);
    }, []),
    onMoveToBasket: useCallback(() => {
      setIsModal(prevState => ({ ...prevState, modalBasket: !prevState.modalBasket }));
    }, []),
    onRemoveFromBasket: useCallback((item) => {
      store.removeFromBasket(item.code);
    }, [])
  };

  return (
    <>
      <Layout headerTitle="Магазин">
        <Controls
          count={store.getState().uniqueGoodsCount}
          total={store.getState().totalBasketCost}
          buttonTitle="Перейти"
          onClick={callbacks.onMoveToBasket}
        />
        <List
          items={store.getState().items}
          buttonTitle="Добавить"
          onClick={callbacks.onAddItem}
        />
      </Layout>
      {isModal.modalBasket &&
        <Modal
          headerTitle="Корзина"
          headerButtonTitle="Закрыть"
          onClick={callbacks.onMoveToBasket}
        >
          <List
            items={store.getState().basket}
            buttonTitle="Удалить"
            onClick={callbacks.onRemoveFromBasket}
          />
          <Total>
            <strong>Итого</strong>
            <strong>
              {store.getState().totalBasketCost + ' \u20bd'}
            </strong>
          </Total>
        </Modal>}
    </>
  );
}

export default App;
