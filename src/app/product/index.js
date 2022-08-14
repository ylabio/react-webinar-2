import React, {useEffect, useCallback} from 'react'
import Layout from '../../components/layout'
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import BasketSimple from "../../components/basket-simple";

function Product() {
  const cn = bem('Product');

  const store = useStore();
	let {id} = useParams();

	useEffect(() => {
    store.get('product').loadItem(id);
  }, []);

	const select = useSelector((state) => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
    item: state.product.item,
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
    country: state.product.country,
    countryCode: state.product.countryCode,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,
  }));

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
	};

  return (
		<Layout head={<h1>{select.title}</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<div className={cn()}>
				<p>{select.description}</p>
				<p>Страна производитель: <span className={cn('text')}>{`${select.country} (${select.countryCode})`}</span></p>
				<p>Категория: <span className={cn('text')}>{select.category}</span></p>
				<p>Год выпуска: <span className={cn('text')}>{select.edition}</span></p>
				<h2 className={cn("price")}>{`Цена: ${(select.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}`}</h2>
				<button onClick={()=>callbacks.addToBasket(id)}>Добавить</button>
			</div>
		</Layout>
		);
}

export default React.memo(Product);