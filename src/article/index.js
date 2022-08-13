import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout';
import {cn as bem} from "@bem-react/classname";
import { useParams } from 'react-router-dom';
import BasketSimple from '../components/basket-simple';
import numberFormat from "../utils/numberFormat";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import './styles.css';

function Article() {
	const { id } = useParams();
	const cn = bem('Article');
	
	const [currArticle, setCurrArticle] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const store = useStore();

	const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

	const fetchCurrArticle = async () => {
		setIsLoading(true);
		const resp = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
		const { result } = await resp.json();
		setCurrArticle(result);
		setIsLoading(false);
	};

	useEffect(() => {
		if(!select.items.length) {
      store.get('catalog').load();
		}
		
		fetchCurrArticle();
	}, [id]);

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

	return (
		<Layout head={<h1>Название товара</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>

			{!isLoading && currArticle?._id ?
				<div className={cn('info')}>
					<div className={`${cn('description')} ${cn('item')}`}>{currArticle.description}</div>
					<div className={`${cn('madein')} ${cn('item')}`}>Страна производитель: <strong>{currArticle.maidIn?.title} ({currArticle.maidIn?.code})</strong></div>
					<div className={`${cn('category')} ${cn('item')}`}>Категория: <strong>{currArticle.category?.title}</strong></div>
					<div className={`${cn('edition')} ${cn('item')}`}>Год выпуска: <strong>{currArticle.edition}</strong></div>
					<div className={`${cn('price')} ${cn('item')}`}><strong>Цена: {numberFormat(currArticle.price)} ₽</strong></div>
					<button onClick={() => callbacks.addToBasket(currArticle._id)}>Добавить</button>
				</div> : 
				!currArticle ? 
					<div className={cn('info')}>Неверный url товара</div> :
					''
			}
		</Layout>
	)
}

export default Article;