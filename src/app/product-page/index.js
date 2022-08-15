import React, {useEffect, useCallback} from "react";
import {useParams} from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import ProductCard from '../../components/product-card';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import style from '../../components/product-card/style.css';

function ProductPage(){
  const store = useStore();
  const {id} = useParams();

	const select = useSelector(state => ({
	  title: state.product.product.title,
	  amount: state.basket.amount,
	  sum: state.basket.sum,
	  lang: state.common.language,
		product: state.product.product
	}));

  useEffect(() => {
    store.get('product').load(id);
  }, [select.lang, id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

	return (
    <Layout head={<h1>{select.title}</h1>}>
		  <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
		  <ProductCard lang={select.lang} product={select.product} addToBasket={callbacks.addToBasket}/>
		</Layout>
	)
}

export default React.memo(ProductPage);
