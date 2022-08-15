import propTypes from 'prop-types';
import React from "react";
import {cn as bem} from "@bem-react/classname";

const cn = bem('Product');

function ProductCard({translate, product, addToBasket}){
	return (
	  <div className={cn()}>
		  <div>{product.description}</div>
		  <div>{translate('add')}: <span>{product.maidIn?.title} ({product.maidIn?.code})</span></div>
	    <div>{translate('category')}: <span>{product.category?.title}</span></div>
		  <div>{translate('yearOfIssue')}: <span>{product.edition}</span></div>
		  <div className={cn('price')}>{translate('price')}: <span>{product.price} {'\u20bd'}</span></div>
		  <button onClick={() => addToBasket(product._id)}>{translate('add')}</button>
	  </div>
	)
}

ProductCard.propTypes = {
	product: propTypes.object,
	addToBasket: propTypes.func,
	translate: propTypes.func
}

ProductCard.defaultProps = {
	addToBasket: ()=>{},
	translate: ()=>{}
}

export default React.memo(ProductCard);
