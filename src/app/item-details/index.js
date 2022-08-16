import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import ItemInfo from '../../components/item-info';

import './style.css';
import Loader from '../../components/loader';

function ItemDetails() {
	const store = useStore();
	const { id } = useParams();

	const { amount, sum, item, isLoading } = useSelector((state) => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
		item: state.catalog.currItem,
		isLoading: state.catalog.isLoading,
	}));

	useEffect(() => {
		store.get('catalog').selectItem(id);
		store.get('modals').close();
	}, [id]);

	const callbacks = {
		openModalBasket: useCallback(
			() => store.get('modals').open('basket'),
			[],
		),
		addToBasket: useCallback(
			(_id) => store.get('basket').addToBasket(_id),
			[],
		),
	};

	return (
		<Layout head={<h1>{item && item.title}</h1>}>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<BasketSimple
						onOpen={callbacks.openModalBasket}
						amount={amount}
						sum={sum}
						isLinked
					/>
					{item && (
						<ItemInfo item={item} onAdd={callbacks.addToBasket} />
					)}
				</>
			)}
		</Layout>
	);
}

export default React.memo(ItemDetails);
