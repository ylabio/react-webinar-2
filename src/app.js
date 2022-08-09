import React, {useCallback, useState} from 'react';
import Button from './components/button';
import Head from './components/head';
import List from "./components/list";
import Layout from "./components/layout";
import ModalPreview from './components/modalPreview';
import Modal from './components/modal';
import Total from './components/total';
import style from './components/modal/style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
	const [isVisibleModal, setVisibleModal] = useState(false);

  const callbacks = {
    onAddItems: useCallback(item => {
      store.addInBasket(item);
    }, []),
		onTransition: useCallback(() => setVisibleModal(prev => !prev), []),
		onDeleteItems: useCallback(item => {
			store.deleteFromBasket(item);
		}, []),
  }

	const button = <Button title='Закрыть' callback={callbacks.onTransition} />;
  const basket = store.getState().basket;

  return (
  		<div className={isVisibleModal ? 'App' : ''}>
				<Layout head={<Head title='Магазин' />}>
					<ModalPreview basket={basket} onTransition={callbacks.onTransition}/>
					<List items={store.getState().items} onAddItems={callbacks.onAddItems} />
				</Layout>
				<Modal isVisibleModal={isVisibleModal} closeModal={callbacks.onTransition}>
					<Layout head={
						<Head
								title='Корзина'
								button={button}
						/>}
					>
						<List items={basket}
									onDeleteItems={callbacks.onDeleteItems}
						/>
						{!!basket.length && <Total basket={basket}/>}
					</Layout>
				</Modal>
			</div>
  );
}

export default App;
