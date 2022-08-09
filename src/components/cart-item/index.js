import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {getFormattedPrice} from '../../utils';
import './style.css';

function CartItem({item, onClick}) {
  const cn = bem('CartItem');

  const callbacks = {
    onItemRemove: useCallback(() => {
      onClick(item.code);
    }, [onClick,  item])
  };

  return (
    <li className={cn()}>
      <div className={cn('code')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {getFormattedPrice(item.price)}
      </div>
      <div className={cn('amount')}>
        {`${item.amount} шт`}
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
  item: propTypes.exact({
    code: propTypes.number,
    title: propTypes.string,
    price: propTypes.number,
    amount: propTypes.number,
  }),
  onClick: propTypes.func.isRequired
}

export default React.memo(CartItem);
