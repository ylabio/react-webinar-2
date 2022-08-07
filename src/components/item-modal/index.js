import React, { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

const ItemModal = ({ item, onDelete }) => {
  const cn = bem('Item');

  const callbacks = {
    onDelete: useCallback(() => {
      onDelete(item.code);
    }, [onDelete, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('number')}>
        {item.price.toLocaleString('ru-RU')}&nbsp;₽
      </div>
      <div className={cn('amount')}>{item.amount}&nbsp;шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func,
};

ItemModal.defaultProps = {
  item: {},
  onDelete: () => {},
};

export default memo(ItemModal);
