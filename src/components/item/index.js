import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: useCallback(() => {
      props.onAddToCart(props.item.code);
    }, [props.onAddToCart, props.item]),
    onDeleteFromCart: useCallback(() => {
      props.onDeleteFromCart(props.item.code);
    }, [props.onDeleteFromCart, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>
        <p> {props.item.title}</p>
        <p className={cn('info')}>
          {new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
          }).format(props.item.price)}
          {props.item.amount ? <p>{props.item.amount} шт</p> : null}
        </p>
      </div>
      <div className={cn('actions')}>
        <button
          onClick={
            props.item.amount
              ? callbacks.onDeleteFromCart
              : callbacks.onAddToCart
          }
        >
          {props.item.amount ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func,
  onDeleted: propTypes.func,
  onAddToCart: propTypes.func,
  onDeleteFromCart: propTypes.func,
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},
  onAddToCart: () => {},
  onDeleteFromCart: () => {},
};

export default React.memo(Item);
