import React, {useCallback} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import CartPreview from './components/cart-preview';
import Modal from './components/modal';
import Cart from './components/cart';

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
        totalQuantity={store.getState().totalQuantity}
        totalPrice={store.getState().totalPrice}
				toggleModal={toggleModal}
			/>
      <List
        listType='main'
				items={store.getState().items}
				onAddToCart={callbacks.onAddToCart}
			/>
      {openModal && (
				<Modal title='Корзина' toggleModal={toggleModal}>
					<Cart
						cartItems={store.getState().cartItems}
						onDeleteFromCart={callbacks.onDeleteFromCart}
						totalPrice={store.getState().totalPrice}
					/>
				</Modal>
			)}
    </Layout>
  );
}

export default App;
