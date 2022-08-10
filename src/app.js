import React, {useCallback, useState} from "react";
import Modal from "./components/modal";
import Shop from "./components/shop";
import List from "./components/list";
import Total from "./components/total";

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
      store.addToCart(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <React.Fragment>
      <Shop onShowCart={callbacks.onShowModal} onAddItem={callbacks.onAddItem} items={store.getItems()} total={store.getTotal()}/>
      {modal
        ? <Modal title={"Корзина"}
                 content={
                   <React.Fragment>
                     <List items={store.getCart().items} onButtonEvent={callbacks.onDeleteItems} textButton="Удалить"/>
                     <Total total={store.getCart().total}/>
                   </React.Fragment>
                 }
                 onHideModal={callbacks.onHideModal}/>
        : null
      }
    </React.Fragment>
  );
}

export default App;
