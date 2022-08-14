import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function ArticleInfo(props) {
	const cn = bem('Article');

	const callbacks = {
    // Добавление в корзину
		onAdd: useCallback(() => props.onAdd(props.currArticle._id), [props.onAdd, props.currArticle])
  };

	return (
		<>
			{!props.isLoading && props.currArticle?._id ?
				<div className={cn('info')}>
					<div className={`${cn('description')} ${cn('item')}`}>{props.currArticle.description}</div>
					<div className={`${cn('madein')} ${cn('item')}`}>Страна производитель: <strong>{props.currArticle.maidIn?.title} ({props.currArticle.maidIn?.code})</strong></div>
					<div className={`${cn('category')} ${cn('item')}`}>Категория: <strong>{props.currArticle.category?.title}</strong></div>
					<div className={`${cn('edition')} ${cn('item')}`}>Год выпуска: <strong>{props.currArticle.edition}</strong></div>
					<div className={`${cn('price')} ${cn('item')}`}><strong>Цена: {numberFormat(props.currArticle.price)} ₽</strong></div>
					<button onClick={callbacks.onAdd}>Добавить</button>
				</div> : 
				!props.currArticle ? 
					<div className={cn('info')}>Неверный url товара</div> :
					<div className={cn('info')}>Загрузка данных товара...</div>
			}
		</>
	)
}

ArticleInfo.propTypes = {
  isLoading: propTypes.bool,
	currArticle: propTypes.object.isRequired,
	onAdd: propTypes.func
}

ArticleInfo.defaultProps = {
	isLoading: false,
	onAdd: () => {}
}

export default React.memo(ArticleInfo);