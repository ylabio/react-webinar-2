import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { currencyFormat } from '../../utils';

function CartItem({ item, onDelete }) {
  const cn = bem('CartItem');
  const modifiedPrice = currencyFormat(item.price, 0);

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div>{modifiedPrice}</div>
      <div className={cn('amount')}>
        {`${item.count}`}<span>шт</span>
      </div>

      <button
        className={cn('actions')}
        onClick={() => {
          onDelete(item);
        }}
      >
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
