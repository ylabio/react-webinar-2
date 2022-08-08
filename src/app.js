import React, {useCallback} from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Card from "./components/card";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const[modal, setModal] = React.useState(false)
  const callbacks = {
    deleteLogic: useCallback((item) => {
      store.deleteItem(item.code)
    }, []),
    addLogic: useCallback((code) => {
      store.createItem(code);
    }, []),
  }
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls setModal={setModal} items={store.getState().socket}/>
      <List items={store.getState().items}
            addLogic={callbacks.addLogic}
           />
           <Modal modal={modal} setModal={setModal}>
           <Card
           setModal={setModal}
           socket={store.getState().socket}
           deleteLogic={callbacks.deleteLogic}
           onClose={()=>setModal(true)}
           />
           </Modal>
    </Layout>
  );
}

export default App;
