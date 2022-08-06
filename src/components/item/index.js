import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddBucket: useCallback(() => {
      props.onAddBucket(props.item.code);
    }, [props.onAddBucket, props.item]),
    onDeleteBucket: useCallback(() => {
      props.onDeleteBucket(props.item.code);
    }, [props.onDeleteBucket, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.num}</div>
      <div className={cn('title')}>
        <p> {props.item.title}</p>
        <p className={cn('info')}>
          {new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
          })
          .format(props.item.price)}

          {props.item.amount ? <p>{props.item.amount} шт</p> : null}
        </p>
      </div>
      <div className={cn('actions')}>
        <button
          onClick={ props.item.amount ? callbacks.onDeleteBucket : callbacks.onAddBucket}>
          {props.item.amount ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func,
  onDeleted: propTypes.func,

  onAddBucket: propTypes.func,
  onDeleteBucket: propTypes.func,
  num: propTypes.number,
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},

  onAddBucket: () => {},
  onDeleteBucket: () => {},
  num: 0,
};

export default React.memo(Item);
