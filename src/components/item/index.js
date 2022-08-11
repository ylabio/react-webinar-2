import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.item.code)
    }, [props.onAdd, props.item]),

    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
    }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString('ru-RU') + " \u20bd"} 
      </div>
      {props.item.qty && <div className={cn('price')}>
        {props.item.qty + ' шт'}
      </div>}
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={(props.onAdd) ? callbacks.onAdd : callbacks.onDelete}>
          {(props.onAdd) ? 'Добавить' : 'Удалить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onDelete: propTypes.func
}

export default React.memo(Item);
