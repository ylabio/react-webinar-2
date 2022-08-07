import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function Item(props) {
  const cn = bem('Item');

  const { item, onSelect, onDelete, inCart, index } = props;
  console.log(item.quantity);
  const callbacks = {
    onClick: useCallback(() => {
      onSelect(item.code);
    }, [onSelect, item]),

    onDelete: useCallback(
      (e) => {
        e.stopPropagation();
        onDelete(item.code);
      },
      [onDelete, item]
    ),
  };
  return (
    <div className={cn({ selected: item.selected })} onClick={callbacks.onClick}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price + ' ₽'}</div>
      {inCart && <div className={cn('quantity')}>{item.quantity + ' шт.'}</div>}
      <div className={cn('actions')}>
        <Button onClick={inCart ? callbacks.onDelete : callbacks.onSelect}>
          {inCart ? 'Удалить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
  inCart: propTypes.bool.isRequired,
};

Item.defaultProps = {
  onSelect: () => {},
  onDelete: () => {},
  inCart: false,
};

export default Item;
