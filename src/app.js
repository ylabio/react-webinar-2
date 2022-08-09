import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Item from "./components/item";
import CartItem from "./components/cart-item";
import {formatPrice} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
	const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
		onToggleModal: useCallback(() => {
      setIsOpenModal(prevState => !prevState);
		}, []),
		
		onAddToCartItem: useCallback((code) => {
			store.addToCartItem(code);
		}, []),

		onDeleteFromCartItem: useCallback((code) => {
      store.deleteFromCartItem(code);
		}, [])
  }

  return (
		<>
			<Layout head={<h1>Магазин</h1>}>
				<Controls onToggleModal={callbacks.onToggleModal} totalCount={store.getState().totalCount} totalPrice={store.getState().totalPrice}/>
				<List items={store.getState().items}
							onCallbackItem={callbacks.onAddToCartItem}
				>
          <Item />
				</List>
			</Layout>

			{isOpenModal && 
        <Modal 
					head={<><h1>Корзина</h1><button onClick={callbacks.onToggleModal}>Закрыть</button></>} 
					onToggleModal={callbacks.onToggleModal}
				>
					{store.getState().cartItems.length ?
						<>
							<List items={store.getState().cartItems}
										onCallbackItem={callbacks.onDeleteFromCartItem}
							>
								<CartItem />
							</List>
							<div className="Modal-total">
								<strong>Итого</strong>
								<strong>{store.getState().totalCount ? `${formatPrice(store.getState().totalPrice)} ₽` : 'пусто'}</strong>
							</div>
						</> :
						<div className="Modal-empty">
							<h3>Корзина пустая!</h3>
						</div>}
				</Modal>}
		</>
  );
}

export default App;
