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
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>

      <p className={cn('info')}>
        {new Intl.NumberFormat('ru', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0 }).format(props.item.price)}
      </p>

      <div className={cn('actions')}>
        <button onClick={callbacks.onAddBucket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddBucket: propTypes.func,
};

Item.defaultProps = {
  onAddBucket: () => {},
  item: {},
};

export default React.memo(Item);
