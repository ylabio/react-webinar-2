import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import { categoriesNumber, findIndex } from '../../utils';

function CartItem(props) {
  
  const cn = bem('ModalItem');

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDeleteItems(props.item.code)
    }, [props.onDeleteItems,  props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {findIndex(props.items, props.item)}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {categoriesNumber(props.item.price)}
      </div>
      <div className={cn('total')}>
        {props.item.total}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteItems: propTypes.func.isRequired
}

CartItem.defaultProps = {
  onDeleteItems: () => {}
}

export default React.memo(CartItem);
