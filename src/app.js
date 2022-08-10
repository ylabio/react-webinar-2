import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal/modal-layout';
import ModalList from './components/modal/modal-list';
import ModalHead from './components/modal/modal-head';
import ModalFoot from './components/modal/modal-foot';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const getItems = store.getState().items;
  const getCartItems = store.getState().cartItems;

  const [modalActive, setModalActive] = React.useState(false);
  const [priceSum, setPriceSum] = React.useState(0);
  const [itemsSum, setItemsSum] = React.useState(0);

/**
 * Отслеживание изменений в {Store}
 */
  React.useEffect(() => {
    setPriceSum(store.getSummaryPrice());
    setItemsSum(store.getTotalUniqueCount());
  }, [store.getState().cartItems]);

  const callbacks = {
    onAddItems: React.useCallback((code) => {
      store.addItemToCart(code)
    }, []),
    onDeleteItems: React.useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
  }

  return (
    <div>
      <Modal isActive={modalActive}
              setActive={setModalActive}
              head={<ModalHead headText={'Корзина'}
                                headBtnName={'Закрыть'}
                                headBtnAction={setModalActive}/>}
              foot={<ModalFoot totalItems={itemsSum}
                                totalSum={priceSum.toLocaleString('ru-RU')}
                                text={'Итого'}/>}
      >
        <ModalList cartItems={getCartItems}
                    onItemDelete={callbacks.onDeleteItems}
        />
      </Modal>
      <Layout head={<h1>Магазин</h1>}>
        <Controls isModalActive={() => setModalActive(true)}
                  getItemsSum={itemsSum}
                  getPriceSum={priceSum.toLocaleString('ru-RU')}/>
        <List items={getItems}
              onItemSelect={callbacks.onSelectItems}
              onItemAdd={callbacks.onAddItems}
        />
      </Layout>
    </div>
  );
}

export default App;
