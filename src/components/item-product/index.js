import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ItemProduct({ product, onAdd }) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: useCallback((e) => onAdd(product.id), [onAdd, product]),
  };

  return (
    <div className={cn()}>
        <div>{product.description}</div>
        <div>Страна производитель: <span>{product.country}</span></div>
        <div>Категория: <span>{product.category}</span></div>
        <div>Год выпуска: <span>{product.edition}</span></div>
        <div className={cn('price')}>Цена: <span>{numberFormat(product.price)} ₽</span></div>
        <button className={cn('btn')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemProduct.propTypes = {
    product: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

ItemProduct.defaultProps = {
    onAdd: () => {},
}

export default React.memo(ItemProduct);
