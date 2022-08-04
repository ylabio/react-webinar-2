import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import './global.css'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modalView, setModalView] = useState(false)
  const callbacks = {
    onClickBtn: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    showCart: () => 
      setModalView(true),
    closeCart: () => 
      setModalView(false),
    addNewInCart: useCallback((code) => {
      store.addInCart(code)
    }, []),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                handleClick={callbacks.showCart}
      />
      <List items={store.getState().items}
            handleBtn={callbacks.addNewInCart}
      />
      {
        modalView && 
        <Modal cart={store.getState().cart} 
               handleClose={callbacks.closeCart}
               handleBtn={callbacks.deleteFromCart}
               btnText={"Удалить"}
      />} {/* Очень хотелось здесь контекст впихнуть на самом деле*/}
    </Layout>
  );
}

export default App;
