import React, {useEffect, useCallback} from 'react'
import Layout from '../../components/layout'
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {cn as bem} from "@bem-react/classname";
import BasketSimple from "../../components/basket-simple";
import ProductInfo from '../../components/product-info'
import Header from './../../components/header/index';


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
		addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
	};
  return (
		// <Layout head={<h1>{select.item.title}</h1>}>
		<Layout head={<Header title={select.item.title}/>}>
			<BasketSimple lang={select.language} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<ProductInfo lang={select.language} item={select.item} callback={()=>callbacks.addToBasket(params.id)}/>
		</Layout>
		);
}

export default React.memo(ProductPage);