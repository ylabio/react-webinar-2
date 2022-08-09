import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Mymodal from './components/mymodal';
import Basket from './components/basket';
import item from './components/item';
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  
  let [modal, setModal] = useState(false);
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    addItemInBasket: useCallback((item) => {
        store.addItemInBasket(item);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openModal={() => setModal(true)} basketInfo={store.getState().basket}/>
      <Mymodal visible={modal} setvisible={setModal}><div><Basket basket={store.getState().basket}></Basket></div></Mymodal>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
            addItemInBasket = {callbacks.addItemInBasket}
      />
    </Layout>
  );
}

export default App;