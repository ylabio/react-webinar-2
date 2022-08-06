import React, { useCallback, useState } from 'react';
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
  const [isModal, setIsModal] = useState(false);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addToBasket(item.code, item.title, item.price);
      setTotalCost(getTotalCost(store.getState().basket));
    }, []),
    onMoveToBasket: useCallback(() => {
      setIsModal(prevState => !prevState);
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
      {isModal &&
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
