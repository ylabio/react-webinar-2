import React, {useCallback, useState} from 'react';
import Modal from "./components/modal";
import Cart from "./components/cart";
import Shop from "./components/shop";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modal, setModal] = useState(false);

  const callbacks = {
    onShowModal: useCallback(() => {
      setModal(true);
    }, []),
    onHideModal: useCallback(() => {
      setModal(false);
    }, []),
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItems(code);
    }, []),
  }

  return (
    <React.Fragment>
      <Shop onShowCart={callbacks.onShowModal} onAddItem={callbacks.onAddItem} state={store.getState()}/>
      {modal
        ? <Modal content={<Cart state={store.getState()} onDeleteItems={callbacks.onDeleteItems}  onHideModal={callbacks.onHideModal}/>}/>
        : null
      }
    </React.Fragment>
  );
}

export default App;
