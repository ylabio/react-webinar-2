import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, [props.onSelect, props.item, setCount, count]),

    onAdder: useCallback((e) => {
      e.stopPropagation();
      props.onAdder(props.item)
    }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdder}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
