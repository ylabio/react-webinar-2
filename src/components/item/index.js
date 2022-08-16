import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item]),
    onOpenItem: useCallback(() => props.navigate(`${props.path}/${props.item._id}`), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <span
          className={cn('title')}
          onClick={callbacks.onOpenItem}
        >
          {props.item.title}
        </span>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
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
