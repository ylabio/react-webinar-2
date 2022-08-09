import React, { useCallback, useEffect, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import { getTotalCost } from './utils';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [totalCost, setTotalCost] = useState('0');
  const [isModal, setIsModal] = useState({
    modalBasket: false
  });

  useEffect(() => {
    if (isModal.modalBasket) {
      document.body.style.overflowY = 'hidden';

      const clientHeight = document.documentElement.clientHeight;
      const modalContainer = document.getElementsByClassName('Modal-container')[0];
      const modalContainerHeight = parseFloat(getComputedStyle(modalContainer).height);
      const modalWrapper = document.getElementsByClassName('Modal-wrapper')[0];

      clientHeight < modalContainerHeight
        ? modalWrapper.classList.add('Modal-wrapper_scroll')
        : modalWrapper.classList.remove('Modal-wrapper_scroll');
    } else {
      document.body.style.overflowY = '';
    }
  }, [isModal, totalCost]);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addToBasket(item.code, item.title, item.price);
      setTotalCost(getTotalCost(store.getState().basket));
    }, []),
    onMoveToBasket: useCallback(() => {
      setIsModal(prevState => ({ ...prevState, modalBasket: !prevState.modalBasket }));
    }, []),
    onRemoveFromBasket: useCallback((item) => {
      store.removeFromBasket(item.code);
      setTotalCost(getTotalCost(store.getState().basket));
    }, [])
  };

  return (
    <>
      <Layout headerTitle="Магазин">
        <Controls
          count={store.getState().basket.length}
          total={totalCost}
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
            total={totalCost}
          />
        </Modal>}
    </>
  );
}

export default App;
