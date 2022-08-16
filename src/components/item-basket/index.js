import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove, props.item]),
    onOpenItem: useCallback((id) => {
      props.navigate(`${props.path}/${id}`);
      props.onClose();
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <span
          className={cn('title')}
          onClick={() => {
            callbacks.onOpenItem(props.item._id);
          }}
        >
          {props.item.title}
        </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

export default React.memo(ItemBasket);
