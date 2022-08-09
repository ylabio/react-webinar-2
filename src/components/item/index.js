import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    }, [props.onAdd, props.item]),
  };

  const { code, title, price } = props.item;

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {code}
      </div>
      <div className={cn('title')}>
        {title}
      </div>
      <div className={cn('price')}>
        {price} ₽
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions-button')} onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
