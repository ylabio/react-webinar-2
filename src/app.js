import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import { numberWithSpaces } from "./utils";
import { cn as bem } from "@bem-react/classname";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const cn = bem('Modal');

  const [activeModal, setActiveModal] = useState(false)
  const goods = store.getState().shoppingCart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, []),
    onToggleModal: useCallback(() => {
      setActiveModal(activeModal => !activeModal)
    }, []),
  }

  return (
    <div>
      <Layout head={<h1>Магазин</h1>}>
        <Controls goods={store.getState().shoppingCart}
                  store={store}
                  onToggleModal={callbacks.onToggleModal}/>
        <List items={store.getState().items}
              actionHandler={callbacks.onAddItem}
        />
      </Layout>
      {activeModal &&
      <Modal onToggleModal={callbacks.onToggleModal} head={<h1>Корзина</h1>}>
        {goods.length ? <List items={goods} actionHandler={callbacks.onDeleteItem}/> :
          <div className={cn('message')}>Товары не добавлены</div>}
        {goods.length > 0 &&
          <div className={cn('total')}>
            Итого <span>{numberWithSpaces(store.sumOfGoods())} ₽</span>
          </div>
        }
      </Modal>
      }
    </div>
  );
}

export default App;
