import React, { useState, useCallback } from "react";
import Modal from "./components/modal";
import Buy from "./components/buy";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [buyState, setBuyState] = useState([]);
  const [modal, setModal] = useState(false);

  // const addItem = (item) => {
  //   item.total ? item.total++ : (item.total = 1);

  //   if (!buyState.map((item) => item.code).includes(item.code)) {
  //     setBuyState([...buyState, item]);
  //   } else {
  //     setBuyState([...buyState.filter((i) => i.code !== item.code), item]);
  //   }
  // };

  // console.log("buyState", buyState);
  // console.log("modal", modal);

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((item) => {
      console.log(item, "item");
      store.addItem(item);
    }, []),
  };

  return (
    <Layout
      head={<h1>Магазин</h1>}
      modal={modal}
      // componentModal={
      //   <Modal
      //     setModal={setModal}
      //     buyState={buyState}
      //     setBuyState={setBuyState}
      //   />
      // }
    >
      {/* <Buy buyState={buyState} setModal={setModal} /> */}
      <List items={store.getState().items} addItem={callbacks.onAddItem} />
    </Layout>
  );
}

export default App;
