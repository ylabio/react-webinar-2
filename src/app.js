import React, {useCallback} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import CartPreview from './components/cart-preview';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddToCart: useCallback((code, item) => {
      store.addToCart(code, item)
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code)
    })
  }

  const [openModal, setOpenModal] = React.useState(false);

  function toggleModal() {
    setOpenModal(!openModal);
  }

  if (openModal) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}

  return (
    <Layout head={<h1>Магазин</h1>}>
      <CartPreview
        totalQuantity={store.getState().cartItems.length}
        totalPrice={store.totalPrice()}
				toggleModal={toggleModal}
			/>
      <List
				items={store.getState().items}
				onAddToCart={callbacks.onAddToCart}
			/>
      {openModal && (
				<Modal
          title='Корзина'
					toggleModal={toggleModal}
					cartItems={store.getState().cartItems}
					onDeleteFromCart={callbacks.onDeleteFromCart}
					totalPrice={store.totalPrice()}
				/>
			)}
    </Layout>
  );
}

export default App;
