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
        <div>{translation.product.country}: <span>{product.country}</span></div>
        <div>{translation.product.category}: <span>{product.category}</span></div>
        <div>{translation.product.year}: <span>{product.edition}</span></div>
        <div className={cn('price')}>{translation.product.price}: <span>{numberFormat(product.price)} ₽</span></div>
        <button className={cn('btn')} onClick={callbacks.onAdd}>{translation.product.add}</button>
    </div>
  )
}

ItemProduct.propTypes = {
    product: propTypes.object.isRequired,
    onAdd: propTypes.func,
    translation: propTypes.object,
}

ItemProduct.defaultProps = {
    onAdd: () => {},
    translation: {},
}

export default React.memo(ItemProduct);
