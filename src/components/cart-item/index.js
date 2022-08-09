import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {getFormattedPrice} from '../../utils';

function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
    onItemRemove: useCallback(() => {
      props.onItemRemove(props.cartItem.code);
    }, [props.onItemRemove,  props.cartItem])
  };

  return (
    <li className={cn()}>
      <div className={cn('code')}>
        {props.cartItem.code}
      </div>
      <div className={cn('title')}>
        {props.cartItem.title}
      </div>
      <div className={cn('price')}>
        {getFormattedPrice(props.cartItem.price)}
      </div>
      <div className={cn('amount')}>
        {`${props.cartItem.amount} шт`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemRemove}>
          Удалить
        </button>
      </div>
    </li>
  )
}

CartItem.propTypes = {
  cartItem: propTypes.exact({
    code: propTypes.number,
    title: propTypes.string,
    price: propTypes.number,
    amount: propTypes.number,
  }),
  onItemRemove: propTypes.func.isRequired
}

export default React.memo(CartItem);
