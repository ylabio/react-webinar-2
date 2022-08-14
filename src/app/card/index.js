import Layout from "../../components/layout";
import React, {useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import BasketSimple from "../../components/basket-simple";
import useSelector from "../../utils/use-selector";
import CardInfo from "../../components/card-info";

function Card() {
	const params = useParams();
	const store = useStore();

	useState(() => {
		store.get('card').getArticlesById(params.id);
	}, [])

	const select = useSelector(state => ({
		item: state.card.item,
		amount: state.basket.amount,
		sum: state.basket.sum
	}));

	const callbacks = {
		openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		onAdd: useCallback((id) => store.get('basket').addToBasket(id), []),
	};

	return (
		<Layout head={<h1>Название товара</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<CardInfo item={select.item} onAdd={callbacks.onAdd}/>
		</Layout>
	)
}

export default React.memo(Card);