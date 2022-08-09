import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  //определяем видимость модального окна, false окно закрыто, true открыто
  const [ modalActive, setModalActive ] = useState(false);

  //onAddItems добавление в коризну, DeleteItems удаление в корзине
  const callbacks = {
    onAddItems: useCallback((code) => {
      store.addInCart(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls counterItems={store.getState().total[0].totalItems}
                  counterTotalPrice={store.getState().total[0].totalPrice}
                  cart={store.getState().cart}
                  openCart={setModalActive}/>
        <List items={store.getState().items}
              onSelect={callbacks.onAddItems}
        />
      </Layout>
      {modalActive && <Modal head={'Корзина'} setActive={setModalActive}>
        <Cart cart={store.getState().cart}
              onItemDelete={callbacks.onDeleteItems}
              counterTotalPrice={store.getState().total[0].totalPrice}
        />
      </Modal>}
    </>        
  );
}

export default App;
