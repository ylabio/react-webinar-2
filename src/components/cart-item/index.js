import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
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
          <span>{props.item.amount} шт</span>
        </p>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteFromCart: propTypes.func,
};

CartItem.defaultProps = {
  onDeleteFromCart: () => {},
  item: {},
};

export default React.memo(CartItem);
