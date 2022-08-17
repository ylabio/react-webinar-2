import propTypes from 'prop-types';
import React from "react";
import {cn as bem} from "@bem-react/classname";
import style from './style.css';

const cn = bem('Product');

function ProductCard({translate, product, addToBasket, lang}){
  return (
    <div className={cn()}>
	  <div>{product.description?.[lang]}</div>
	  <div>{translate('add')}: <span>{product.maidIn?.title?.[lang]} ({product.maidIn?.code})</span></div>
	  <div>{translate('category')}: <span>{product.category?.title?.[lang]}</span></div>
	    <div>{translate('yearOfIssue')}: <span>{product.edition?.[lang]}</span></div>
		<div className={cn('price')}>{translate('price')}: <span>{product.price} {'\u20bd'}</span></div>
		<button onClick={() => addToBasket(product._id)}>{translate('add')}</button>
	</div>
  )
}

ProductCard.propTypes = {
  product: propTypes.object,
  addToBasket: propTypes.func,
  translate: propTypes.func,
  lang: propTypes.string
}

ProductCard.defaultProps = {
  addToBasket: ()=>{},
  translate: ()=>{},
  lang: 'ru'
}

export default React.memo(ProductCard);
