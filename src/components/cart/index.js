import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import numberFormat from "utils/number-format";

function Cart(props) {
  const cn = bem('Cart');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  if (!props.item.maidIn) {
    return <div>Loading</div>
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item.description}</p>
      <p className={cn('description')}>Страна производитель: <span>{props.item.maidIn.title}</span></p>
      <p className={cn('description')}>Категория: <span>{props.item.category.title}</span></p>
      <p className={cn('description')}>Год выпуска: <span>{props.item.edition}</span></p>
      <p className={cn('price')}>Цена: {numberFormat(props.item.price)} ₽</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Cart.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
};

Cart.defaultProps = {
  item: {},
};

export default React.memo(Cart);
