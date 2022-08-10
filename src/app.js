//Core
import React, { useCallback, useMemo, useState } from 'react';

//Local
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import ModalLayout from './components/layout/modal-layout';
import CartInfo from './components/cart-info';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
	const { items, cart } = store.getState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const cartAPI = {
		onAddItem: useCallback((item) => {
			store.addItemToCart(item);
		}, []),
		onDeleteItem: useCallback((item) => {
			store.deleteItemFromCart(item);
		}, []),
	};

	const modalAPI = {
		onModalOpen: useCallback(() => {
			setIsModalOpen(true);
		}, []),
		onModalClose: useCallback(() => {
			setIsModalOpen(false);
		}, []),
	};

	return (
		<>
			<Layout head={<h1>Магазин</h1>}>
				<Controls
					itemsCount={cart.itemsAmout}
					totalPrice={cart.totalPrice}
					onCartOpen={modalAPI.onModalOpen}
				/>
				<List items={items} itemAction={cartAPI.onAddItem} />
			</Layout>
			<ModalLayout
				isModalOpen={isModalOpen}
				header={
					<>
						<h2>Корзина</h2>
						<button onClick={modalAPI.onModalClose}>Закрыть</button>
					</>
				}
			>
				<CartInfo
					items={cart.items}
					onDeleteItem={cartAPI.onDeleteItem}
					totalPrice={cart.totalPrice}
				/>
			</ModalLayout>
		</>
	);
}

export default App;
