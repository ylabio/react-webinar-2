import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Mymodal from './components/mymodal';
import ItemOfStore from './components/itemOfStore';
import ItemOfBasket from './components/itemOfBasket';
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  
  let [modal, setModal] = useState(false);
  const callbacks = {
    addItemInBasket: useCallback((item) => {
        store.addItemInBasket(item);
    }, []),
    deleteItemInBasket: useCallback((item) => {
      store.deleteItemInBasket(item), []
    })
  }

  const {totalOfBasket, items} = store.getState().basket;
  const summary = items.length === 0 ? 'пусто' : `${totalOfBasket} ₽`;
  console.log(items)
  const basket = <List>{store.getState().basket.items.map((item) => <ItemOfBasket key={item.code} item={item} deleteItemInBasket={callbacks.deleteItemInBasket}></ItemOfBasket>)}</List>
  const myModal = <div><div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center',padding:' 0px 20px'}}><h1>Корзина</h1><button onClick={() => setModal(false)}>Закрыть</button></div>{basket} </div>

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openModal={() => setModal(true)} basketInfo={store.getState().basket}/>
      <Mymodal visible={modal} setvisible={setModal}><div>{myModal}</div>{`Итого: ${summary}`}</Mymodal>
      <List>{store.getState().items.map((item) => <ItemOfStore key={item.code} item={item} addItemInBasket={callbacks.addItemInBasket}></ItemOfStore>)}</List>
    </Layout>
  );
}

export default App;