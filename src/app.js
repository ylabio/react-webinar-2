import React, {useCallback, useMemo} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import ModalLayout from './components/modal-layout';
import Modalhead from './components/modalhead';
import Cart from './components/cart';
import ModalTotal from './components/modal-total';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { items, cart, totals, isModalOpen, totalAmount } = store.getState();

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onRemoveItem: useCallback((code) => {
      store.removeFromCart(code)
    }, []),
    onShowCart: useCallback((e) => {
      e.stopPropagation();
      store.openModal();
    }, []),
    hideCart: useCallback(() => {
      store.closeModal();
    }, []),
  };

  return (
    <>
      <Layout isModalOpen={isModalOpen} head={<h1>Магазин</h1>} onClick={callbacks.hideCart}>
        <Controls cart={cart} totals={totals} onShowCart={callbacks.onShowCart}/>
        <List items={items} onItemAdd={callbacks.addToCart}/>
      </Layout>
      {isModalOpen && 
      <ModalLayout head={<Modalhead onClose={callbacks.hideCart} />}>
        <Cart cart={cart} onRemove={callbacks.onRemoveItem}/>
        <ModalTotal totalAmount={totalAmount} />
      </ModalLayout>}
    </>
  );
}

export default App;
