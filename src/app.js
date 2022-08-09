import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import BasketInfo from './components/basket-info';
import Basket from './components/basket/basket';
import Item from './components/item';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const { total, uniqueProducts, basket, items } = store.getState();
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    switchModal: useCallback(() => {
      setModal(!modal);
    }, [modal]),
    addItem: useCallback((code) => {
      store.addToBasket(code)
    }, [])
  }
  const cn = bem('List');
  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketInfo total={total} switchModal={callbacks.switchModal} uniqueProducts={uniqueProducts} />
      <List
        cn={cn()}
      >
        {items.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item item={item} callBack={callbacks.addItem} title={"Добавить"} />
          </div>
        )}
      </List>
      {
        modal ?
          <Modal
            title="Корзина"
            switchModal={callbacks.switchModal}
          >
            <Basket
              deleteItem={callbacks.onDeleteItem}
              basket={basket}
              total={total}
              uniqueProducts={uniqueProducts}
            />
          </Modal>
          :
          null
      }
    </Layout>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired,
}

export default App;
