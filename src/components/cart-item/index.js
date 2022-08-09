import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatCurrency } from '../../utils';
import './style.css';

function CartItem({ item, onDelete }) {
  const cn = bem('Item');

  const callbacks = {
    onDeleted: useCallback(() => {
      onDelete(item.code);
    }, [onDelete, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{formatCurrency(item.price)}</div>
      <div className={cn('count')}>{item.count} шт.</div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onDeleted}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
