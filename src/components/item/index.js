import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';

function Item({ item, onDelete, onAdd }) {
  const cn = bem('Item');

  const callbacks = {
    onDeleted: useCallback(() => {
      onDelete(item.code);
    }, [onDelete, item]),

    onAdded: useCallback(() => {
      onAdd(item.code, item);
    }, [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{formatCurrency(item.price)}</div>
      {item.count && <div className={cn('count')}>{item.count} шт.</div>}
      <div className={cn('actions')}>
        {item.count ? (
          <button className={cn('button')} onClick={callbacks.onDeleted}>
            Удалить
          </button>
        ) : (
          <button className={cn('button')} onClick={callbacks.onAdded}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func,
  onAdd: propTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onAdd: () => {},
};

export default React.memo(Item);
