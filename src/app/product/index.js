import React, {useEffect, useCallback} from 'react'
import Layout from '../../components/layouts/layout'
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ProductInfo from '../../components/product-info'
import Header from './../../components/header/index';
import Subheader from '../../components/subheader';


function ProductPage() {


  const store = useStore();
	let params = useParams();

	useEffect(() => {
    store.get('product').loadItem(params.id);
  }, [params.id]);

	const select = useSelector(state => ({
		sum: state.basket.sum,
		amount: state.basket.amount,
		item: state.product.item,
		language: state.catalog.language,
  }));

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		// Добавление в корзину
		addToBasket: useCallback(_id => {
			store.get('basket').addToBasket(_id)}, []),
	};
  return (
		<Layout head={<Header title={select.item.title} lang={select.language}/>}>
			<Subheader amount={select.amount} sum={select.sum} callback={callbacks.openModalBasket} lang={select.language} link={'/'}/>
			<ProductInfo lang={select.language} id={params.id} item={select.item} callback={callbacks.addToBasket}/>
		</Layout>
		);
}

export default React.memo(ProductPage);