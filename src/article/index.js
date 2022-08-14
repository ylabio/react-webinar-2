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

	const [currArticle, setCurrArticle] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	
	const store = useStore();

	const select = useSelector(state => ({
    items: state.catalog.items,
		limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

	const articleCurrPage = Math.ceil(state?._key / select.limit);

	const fetchCurrArticle = async (id) => {
		setIsLoading(true);
		const resp = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
		const { result } = await resp.json();
		setCurrArticle(result);
		setIsLoading(false);
	};

	useEffect(() => {
		if(!select.items.length) {
			const skip = articleCurrPage === 1 ? 0 : (articleCurrPage - 1) * select.limit;
      store.get('catalog').load(select.limit, skip);
			store.get('catalog').setCurrPage(articleCurrPage);
		}
		
		fetchCurrArticle(id);
	}, [id]);

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

	return (
		<Layout head={<h1>{state?.title ? state.title : 'Неизвестный товар'}</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<ArticleInfo isLoading={isLoading} currArticle={currArticle} onAdd={callbacks.addToBasket}/>
		</Layout>
	)
}

export default Article;