import propTypes from 'prop-types';
import React from "react";
import {cn as bem} from "@bem-react/classname";
import { dictionaryEnum } from '../../enums/dictionaryEnum';

const cn = bem('Product');

function ProductCard({lang, product, addToBasket}){
	return (
	  <div className={cn()}>
		  <div>{product.description}</div>
		  <div>{dictionaryEnum.add[lang]}: <span>{product.maidIn?.title} ({product.maidIn?.code})</span></div>
	    <div>{dictionaryEnum.category[lang]}: <span>{product.category?.title}</span></div>
		  <div>{dictionaryEnum.yearOfIssue[lang]}: <span>{product.edition}</span></div>
		  <div className={cn('price')}>{dictionaryEnum.price[lang]}: <span>{product.price} {'\u20bd'}</span></div>
		  <button onClick={() => addToBasket(product._id)}>{dictionaryEnum.add[lang]}</button>
	  </div>
	)
}

ProductCard.propTypes = {
	lang: propTypes.string,
	product: propTypes.object,
	addToBasket: propTypes.func
}

ProductCard.defaultProps = {
	addToBasket: ()=>{}
}

export default React.memo(ProductCard);
