import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import {calculateTotalPrice} from "./utils";

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
				<Controls onToggleModal={callbacks.onToggleModal} cartItems={store.getState().cartItems}/>
				<List items={store.getState().items}
							onCallbackItem={callbacks.onAddToCartItem}
				/>
			</Layout>

			<Modal isOpenModal={isOpenModal} onToggleModal={callbacks.onToggleModal}>
				<Layout head={<><h1>Корзина</h1><button onClick={callbacks.onToggleModal}>Закрыть</button></>}>
					{store.getState().cartItems.length ?
						<>
              <List items={store.getState().cartItems}
                    onCallbackItem={callbacks.onDeleteFromCartItem}
              />
              <div className="Modal-total">
								<strong>Итого</strong>
								<strong>{store.getState().cartItems.length ? `${calculateTotalPrice(store.getState().cartItems)} ₽` : 'пусто'}</strong>
							</div>
						</> :
						<div className="Modal-empty">
              <h3>Корзина пустая!</h3>
						</div>
        }
				</Layout>
			</Modal>
		</>
  );
}

export default App;
