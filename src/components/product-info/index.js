import React from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';
import ProdInfoItem from '../product-info-item'

function ProductInfo({item, callback}) {
  const cn = bem('Product');

	return (
		<div className={cn()}>
			<p>{item.description}</p>
			<ProdInfoItem param={'Страна производитель: '} value={`${item.madeInTitle} (${item.madeInCode})`}/>
			<ProdInfoItem param={'Категория: '} value={item.category}/>
			<ProdInfoItem param={'Год выпуска: '} value={item.edition}/>
			<h2>{`Цена: ${(item.price)}`}</h2>
			<button onClick={callback}>Добавить</button>
		</div>
	)
}

ProductInfo.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired,
};

ProductInfo.defaultProps = {
  callback: () => {},
};

export default React.memo(ProductInfo)