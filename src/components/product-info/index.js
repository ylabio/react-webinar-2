import React from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';
import ProdInfoItem from '../product-info-item'
import { langVars } from '../../utils/localisation';
import numberFormat from '../../utils/numberFormat'

function ProductInfo({item, callback, lang, id}) {
  const cn = bem('Product');
	return (
		<div className={cn()}>
			<p>{item.description}</p>
			<ProdInfoItem param={langVars.productInfo.country[lang]} value={`${item.madeInTitle} (${item.madeInCode})`}/>
			<ProdInfoItem param={langVars.productInfo.category[lang]} value={item.category}/>
			<ProdInfoItem param={langVars.productInfo.year[lang]} value={item.edition}/>
			<h2>{`${langVars.productInfo.price[lang]}${numberFormat(item.price, {style: 'currency', currency: 'RUB'})}`}</h2>
			<button onClick={()=>callback(item._id)}>{langVars.item.addBtn[lang]}</button>
		</div>
	)
}

ProductInfo.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired,
	lang: propTypes.number
};

ProductInfo.defaultProps = {
	item: {},
  callback: () => {},
};

export default React.memo(ProductInfo)