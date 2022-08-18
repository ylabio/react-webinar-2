import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ItemProduct({ product, onAdd, translation }) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: useCallback((e) => onAdd(product.id), [onAdd, product]),
  };

  return (
    <div className={cn()}>
        <div>{product.description}</div>
        <div>{translation('country')}: <span>{product.country}</span></div>
        <div>{translation('category')}: <span>{product.category}</span></div>
        <div>{translation('year')}: <span>{product.edition}</span></div>
        <div className={cn('price')}>{translation('price')}: <span>{numberFormat(product.price)} ₽</span></div>
        <button className={cn('btn')} onClick={callbacks.onAdd}>{translation('add')}</button>
    </div>
  )
}

ItemProduct.propTypes = {
    product: propTypes.object.isRequired,
    onAdd: propTypes.func,
    translation: propTypes.func,
}

ItemProduct.defaultProps = {
    onAdd: () => {},
    translation: () => {},
}

export default React.memo(ItemProduct);
