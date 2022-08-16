import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../components/layout';
import BasketSimple from '../components/basket-simple';
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import ArticleInfo from '../components/article-info';

function Article() {
	const { id } = useParams();
	const { state } = useLocation();
	
	const store = useStore();

	const select = useSelector(state => ({
		currArticle: state.article.currArticle,
		isLoading: state.article.isLoading,
    items: state.catalog.items,
		limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

	useEffect(() => {
		store.get('article').fetchCurrArticle(id);
	}, [id]);

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

	return (
		<Layout head={<h1>{state?.title ? state.title : select.currArticle.title ? select.currArticle?.title : ''}</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<ArticleInfo isLoading={select.isLoading} currArticle={select.currArticle} onAdd={callbacks.addToBasket}/>
		</Layout>
	)
}

export default Article;