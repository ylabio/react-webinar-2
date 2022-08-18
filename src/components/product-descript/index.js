import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ProductDesc({product, onAdd}) {
  const cn = bem('ProductDesc');

  
  const callbacks = {
    onAdd: useCallback(() => onAdd(product._id), [onAdd, product])
  };





  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>Страна производитель: <b>{product.madeIn} ({product.madeInCode})</b></p>
      <p>Категория: <b>{product.category}</b></p>
      <p>Год выпуска: <b>{product.edition}</b></p>
      <h2 className={cn('price')}>Цена: {numberFormat(product.price)}</h2>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ProductDesc.propTypes = {
  product: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ProductDesc.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ProductDesc);