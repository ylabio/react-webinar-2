import plural from 'plural-ru';
import React, { useCallback, useEffect, useState } from 'react';
import Controls from "./components/controls";
import Layout from "./components/layout";
import List from "./components/list";
import Modal from "./components/modal";
import { checkBasketDesign, counter } from "./utils";

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

  window.onresize = (e) => { // проверим корректность отображения корзины после ресайза
    checkBasketDesign(modalActive);
  }

  useEffect(() => { // проверим корректность отображения корзины после обновления DOM
    checkBasketDesign(modalActive);
  });

  return (
    <div>

      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onButtonClick={callbacks.onShowBasket}
          stats={
            store.getTotalGoods(true)?
              store.getTotalGoods(true) + ' ' +
              plural(store.getTotalGoods(true), 'товар', 'товара', 'товаров') +
              ' / ' + store.getTotalPrice().toLocaleString('ru-RU') + ' ₽'
            : 'пусто'
          }
        />
        <List items={store.getState().items}
              buttonsAction={callbacks.onAddItemToBasket}
              buttonsLabel="Добавить"
        />
      </Layout>

      {
        modalActive? /* Оптимизация, ибо невидимые элементы продолжают перерисовываться */
          <Modal active={modalActive} setActive={setModalActive}>
            <Layout head={<h1>Корзина</h1>}>
              <List items={store.getState().basket}
                    buttonsAction={callbacks.onRemoveItemFromBasket}
                    buttonsLabel="Удалить"
              />
              <div className='Modal-stats'>
                {store.getTotalGoods(true)
                  ?
                    'Итого\t\t' + store.getTotalPrice().toLocaleString('ru-RU') + ' ₽'
                  :
                    'Нет товаров в корзине!'
                }
              </div>
            </Layout>
          </Modal>
        :null
      }

    </div>
  );
}

export default App;