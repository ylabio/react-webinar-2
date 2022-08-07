import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback(() => {
      props.onAddItemToCart(props.item.code);
    }, [props.onAddItemToCart, props.item]),

    onDelete: useCallback(
      e => {
        e.stopPropagation();
        props.onDelete(props.item.code);
      },
      [props.onDelete, props.item]
    )
  };

  return (
    <div className={cn({selected: props.item.selected})}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {props.cartItem ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
};

export default React.memo(Item);
