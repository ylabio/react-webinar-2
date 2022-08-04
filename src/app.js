import plural from 'plural-ru';
import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import Layout from "./components/layout";
import List from "./components/list";
import Modal from "./components/modal";
import { counter } from "./utils";

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

  return (
    <div>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onButtonClick={callbacks.onShowBasket}
          stats={
            store.getTotalGoods(true) + ' ' +
            plural(store.getTotalGoods(true), 'товар', 'товара', 'товаров') +
            ' / ' + store.getTotalPrice().toLocaleString('ru-RU') + ' ₽'
          }
        />
        <List items={store.getState().items}
              buttonsAction={callbacks.onAddItemToBasket}
              buttonsLabel="Добавить"
        />
      </Layout>
      <Modal active={modalActive} setActive={setModalActive}>
        <Layout head={<h1>Корзина</h1>}>
          <List items={store.getState().basket}
                buttonsAction={callbacks.onRemoveItemFromBasket}
                buttonsLabel="Удалить"
          />
          <div style={{
            position:"absolute",
            whiteSpace: "pre",
            fontSize:18,
            fontWeight: 700,
            padding:25,
            right:102,
          }}>{store.getTotalGoods(true)
              ?
                'Итого\t' + store.getTotalPrice().toLocaleString('ru-RU') + ' ₽'
              :
                'Нет товаров в корзине!'
          }</div>
        </Layout>
      </Modal>
    </div>
  );
}

export default App;
