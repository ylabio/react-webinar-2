import React, {useCallback, useState} from "react";
import Modal from "./components/modal";
import Layout from "./components/layout";
import Controls from "./components/controls";
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
	  <Layout head={[<h1>Магазин</h1>]}>
        <Controls cart={store.getTotal()} onButtonEvent={callbacks.onShowModal}/>
        <List items={store.getItems()} onButtonEvent={callbacks.onAddItem} textButton="Добавить"/>
      </Layout>
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
