import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Product(props) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(), [props.onAdd])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.product.description} </div>
      <div className={cn('maidIn')}>Страна производитель: <b>{props.product.maidIn.title} ({props.product.maidIn.code})</b></div>
      <div className={cn('category')}>Категория: <b>{props.product.category}</b></div>
      <div className={cn('edition')}>Год выпуска: <b>{props.product.edition}</b></div>
      <div className={cn('price')}><b>Цена: {numberFormat(props.product.price)} ₽</b></div>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

Product.propTypes = {
  product: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Product.defaultProps = {
  onAdd: () => {
  },
}

export default React.memo(Product);
