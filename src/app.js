import React, {useState, useCallback} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Item from './components/item';
import ItemBasket from './components/item-basket';
import Layout from './components/layout';
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modal, setModal] = useState(false)
  const state = store.getState();

  const callbacks = {
    setModalWindow: useCallback((value) => {
      setModal(value);
    }, []),
    onAddToBasket: useCallback((itemCode) => {
      store.addToBasket(itemCode);
    }, []),
    onDeleteFromBasket: useCallback((itemCode) => {
      store.deleteFromBasket(itemCode);
    }, []),
    /* Функция рендера для товара в каталоге */
    renderItems: useCallback((item, callback) => (
        <Item item={item} callback={callback} />
    ), []),
    /* Функция рендера для товара в корзине */
    renderBasketItems: useCallback((item, callback) => (
        <ItemBasket item={item} callback={callback} />
    ), []),
  }

  return (
    <>
      {modal && (
        <Modal title={"Корзина"} setVisible={callbacks.setModalWindow}>
          <Basket basketCount={state.basketLength} 
                  totalSum={state.basketSum} 
          >
            <List items={state.basket}
                  callback={callbacks.onDeleteFromBasket}
                  render={callbacks.renderBasketItems}
            />
          </Basket>
        </Modal> 
      )}
      <Layout head={<h1>Магазин</h1>}>
        <Controls basketCount={state.basketLength} 
                  totalSum={state.basketSum}
                  setModal={callbacks.setModalWindow} 
        />
        <List items={state.items}
              callback={callbacks.onAddToBasket}
              render={callbacks.renderItems}
        />
      </Layout>
    </>
  );
}

export default App;
