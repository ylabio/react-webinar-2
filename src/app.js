import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import ModalCart from './components/modal-cart';
import './global.css'
import ItemCatalog from './components/item-catalog';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [modalView, setModalView] = useState(false)
  const callbacks = {
    showCart: useCallback(() => {
      setModalView(true)
    }, [modalView, setModalView]),
    closeCart: useCallback(() => {
      setModalView(false)
    }, [modalView, setModalView]), 
    // Наверно, эти два юзколбека сверху бесполезны, но я могу ошибаться. В любом случае, это мало что ломает.
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
            ItemType={ItemCatalog}
      />
      {
        modalView && 
        <ModalCart closeCart={callbacks.closeCart}
                   onItemClick={callbacks.deleteFromCart}
                   cart={store.getState().cart}
        />
      } {/* Очень хотелось здесь контекст впихнуть на самом деле*/}
    </Layout>
  );
}

export default App;
