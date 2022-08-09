import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';

function Item({ item, onAdd }) {
  const cn = bem('Item');

  const callbacks = {
    onAdded: useCallback(() => {
      onAdd(item.code, item);
    }, [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{formatCurrency(item.price)}</div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onAdded}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
