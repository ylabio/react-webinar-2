import React, {useEffect, useCallback} from 'react'
import Layout from '../../components/layout'
import {useParams} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import ProductCart from '../../components/product-cart';

function Product() {

  const store = useStore();
	let {id} = useParams();

	useEffect(() => {
    store.get('product').loadItem(id);
  }, []);

	const select = useSelector((state) => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
    item: state.product.item,
  }));

	const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
	};

  return (
		<Layout head={<h1>{select.title}</h1>}>
			<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
	    <ProductCart addToBasket={callbacks.addToBasket} product={select.item} id={id} />
		</Layout>
		);
}

export default React.memo(Product);