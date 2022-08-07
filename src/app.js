import React, {useState, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modal, setModal] = useState(false)
  const basket = store.getState().basket;
  const totalSum = store.totalSum();

  const callbacks = {
    setModalWindow: useCallback((value) => {
      setModal(value);
    }, []),
    onAddToBasket: useCallback((item) => {
      store.addToBasket(item);
    }, []),
    onDeleteFromBasket: useCallback((item) => {
      store.deleteFromBasket(item.code);
    }, []),
  }

  return (
    <>
      {modal && (
        <Modal visible={modal} setVisible={callbacks.setModalWindow}>
        <Basket basketCount={basket.length} 
                totalSum={totalSum} 
                setModal={callbacks.setModalWindow}
        >
          <List items={basket}
                callback={callbacks.onDeleteFromBasket}
                btnName={"Удалить"}
          />
        </Basket>
      </Modal> 
      )}
      <Layout head={<h1>Магазин</h1>}>
        <Controls basketCount={basket.length} 
                  totalSum={totalSum}
                  setModal={callbacks.setModalWindow} 
        />
        <List items={store.getState().items}
              callback={callbacks.onAddToBasket}
              btnName={"Добавить"}
        />
      </Layout>
    </>
  );
}

export default App;
