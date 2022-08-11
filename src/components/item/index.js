import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import NumberFormat from 'react-number-format';

function Item(props) {
  const cn = bem('Item');

  const { item, onSelect, onDelete, inCart } = props;
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
      <NumberFormat
        className={cn('price')}
        value={item.price}
        suffix=' ₽'
        displayType={'text'}
        thousandSeparator={' '}
      />
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
  inCart: propTypes.bool,
};

Item.defaultProps = {
  inCart: false,
};

export default Item;
