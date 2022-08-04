import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddInCart: useCallback(
      e => {
        props.onAddInCart({
          code: props.item.code,
          price: props.item.price,
          title: props.item.title,
          count: 1
        });
      },
      [props.onAddInCart, props.item]
    ),
    onDelete: useCallback(
      e => {
        props.onDeleted(props.item.code);
      },
      [props.onDeleted, props.item]
    )
  };

  return (
    <div className={cn({selected: props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price + ' ₽'}</div>

      {props.item.count !== undefined && (
        <div className={cn('count')}>{props.item.count + ' шт'}</div>
      )}
      <div className={cn('actions')}>
        {props.item.count !== undefined ? (
          <button onClick={callbacks.onDelete}>Удалить</button>
        ) : (
          <button onClick={callbacks.onAddInCart}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func.isRequired,
  onAddInCart: propTypes.func.isRequired
};

Item.defaultProps = {
  onDeleted: () => {}
};

export default React.memo(Item);
