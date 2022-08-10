import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdded: useCallback((e) => {
      e.stopPropagation();
      props.onAdded(props.item)
    }, [props.onAdded, props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {props.item.price.toLocaleString('ru-RU')} ₽
        </div>
        <button onClick={callbacks.onAdded}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdded: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {
  },
  onDeleted: () => {
  }
}

export default React.memo(Item);
