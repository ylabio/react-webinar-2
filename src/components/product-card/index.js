import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import style from './style.css';

const cn = bem('Product');

function ProductCard(){
  const store = useStore();
  const select = useSelector(state => ({
	  product: state.product.product,
	  lang: state.common.language
  }));

  const callbacks = {
	  addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

	return (
	  <div className={cn()}>
		  <div>{select.product.description}</div>
		  <div>{dictionaryEnum.add[select.lang]}: <span>{select.product.maidIn?.title} ({select.product.maidIn?.code})</span></div>
	    <div>{dictionaryEnum.category[select.lang]}: <span>{select.product.category?.title}</span></div>
		  <div>{dictionaryEnum.yearOfIssue[select.lang]}: <span>{select.product.edition}</span></div>
		  <div className={cn('price')}>{dictionaryEnum.price[select.lang]}: <span>{select.product.price} {'\u20bd'}</span></div>
		  <button onClick={() => callbacks.addToBasket(select.product._id)}>{dictionaryEnum.add[select.lang]}</button>
	  </div>
	)
}

export default React.memo(ProductCard);
