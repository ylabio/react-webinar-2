import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {getFormattedPrice} from '../../utils';

function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
    onItemDelete: useCallback(() => {
      props.onItemDelete(props.cartItem.code);
    }, [props.onItemDelete,  props.cartItem])
  };

  return (
    <li className={cn()}>
      <div className={cn('count')}>
        {props.itemCount}
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
        <button onClick={callbacks.onItemDelete}>
          Удалить
        </button>
      </div>
    </li>
  )
}

CartItem.propTypes = {
  cartItem: propTypes.object,
  itemCount: propTypes.number.isRequired,
  onItemDelete: propTypes.func.isRequired
}

CartItem.defaultProps = {
  onItemDelete: () => {}
}

export default React.memo(CartItem);
