import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(props.item.count);

  const callbacks = {

    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
      setCount(props.item.count)
    }, [props.onDelete,  props.item]),

    onPush: useCallback((e) => {
      e.stopPropagation();
      setCount(props.item.count)
      props.onPush(props.item.code)
    }, [props.onPush, props.item])
  };

  return (
    <> {
      props.onToggle && count === 0
      ? null
      :  <div className={cn()}>
          <div className={cn('number')}>
            {props.item.code}
          </div>
          <div className={cn('title')}>
            {props.item.title}
            <span>{props.item.price} &#8381; {props.onToggle && <span>{count} шт</span>}</span>
          </div>
          <div className={cn('actions')}>
            {
              !props.onToggle
              ? <button onClick={callbacks.onPush}>Добавить</button>
              : <button onClick={callbacks.onDelete}>Удалить</button>
            }
          </div>
        </div>
    }</>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onPush: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onPush: () => {}
}

export default React.memo(Item);
