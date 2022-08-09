import React, { useCallback, useEffect, useState } from 'react';
import BasketStats from "./components/basket-stats";
import Controls from "./components/controls";
import Layout from "./components/layout";
import List from "./components/list";
import Modal from "./components/modal";
import { checkModalDesign } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [modalActive, setModalActive] = useState(false);
  
  const callbacks = {
    onShowBasket: useCallback(() => {
      setModalActive(true);
    }, [modalActive, setModalActive]),

    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, []),

    onRemoveItemFromBasket: useCallback((code) => {
      store.removeItemFromBasket(code);
    }, []),
  }

  window.onresize = () => { // проверим корректность отображения корзины после ресайза
    checkModalDesign(modalActive);
  }

  useEffect(() => { // проверим корректность отображения корзины после обновления DOM
    checkModalDesign(modalActive);
  });

  return (
    <div>

      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onButtonClick={callbacks.onShowBasket}
          stats={store.getState().stats}
        />
        <List items={store.getState().items}
              buttonsAction={callbacks.onAddItemToBasket}
              buttonsLabel="Добавить"
        />
      </Layout>

      {
        modalActive? /* Оптимизация, ибо невидимые элементы продолжают перерисовываться */
          <Modal setActive={setModalActive}>
            <Layout head={<h1>Корзина</h1>}>
              <List items={store.getState().basket}
                    buttonsAction={callbacks.onRemoveItemFromBasket}
                    buttonsLabel="Удалить"
              />
              <BasketStats stats={store.getState().stats} />
            </Layout>
          </Modal>
        :null
      }

    </div>
  );
}

export default App;