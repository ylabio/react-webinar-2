import React, { useCallback, useEffect } from 'react';

import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import Pagination from '../../components/pagination';

function Main() {
	console.log('Main');

	const store = useStore();

	const select = useSelector((state) => ({
		totalPages: state.catalog.totalPages,
		currPage: state.catalog.currPage,
		items: state.catalog.items,
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

	useEffect(() => {
		store.get('catalog').load();
	}, [select.currPage]);

	const callbacks = {
		// Открытие корзины
		openModalBasket: useCallback(
			() => store.get('modals').open('basket'),
			[],
		),
		// Добавление в корзину
		addToBasket: useCallback(
			(_id) => store.get('basket').addToBasket(_id),
			[],
		),

		selectPage: useCallback(
			(page) => store.get('catalog').selectPage(page),
			[],
		),
	};

	const renders = {
		item: useCallback(
			(item) => <Item item={item} onAdd={callbacks.addToBasket} />,
			[],
		),
	};

	return (
		<Layout head={<h1 lang="ru">Магазин</h1>}>
			<BasketSimple
				onOpen={callbacks.openModalBasket}
				amount={select.amount}
				sum={select.sum}
			/>
			<List items={select.items} renderItem={renders.item} />
			<Pagination
				currPage={select.currPage}
				totalPages={select.totalPages}
				onSelectPage={callbacks.selectPage}
			/>
		</Layout>
	);
}

export default React.memo(Main);
