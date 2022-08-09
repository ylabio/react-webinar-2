import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const [count, setCount] = useState(1);
  const {callbacks} = props

  const onAddClickHandler = useCallback((item) => {
    setCount(prev => ++prev);
    callbacks.onAddItem(item, count);
  }, [count, callbacks])
  
  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${props.item.price} ₽`}
      </div>
      <div className={cn('actions')}>
        <button onClick={() => onAddClickHandler(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default React.memo(Item);
