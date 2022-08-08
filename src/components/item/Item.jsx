import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {

    onClick: useCallback(() => {
      props.onAddProduct(props.item.code)

    }, [props.item]),
  };

  return (
    <div className={cn({ 'selected': props.item.selected })}>
      <div className='Left-content'>
        <div className={cn('number')}>
          {props.item.code}
        </div>
        <div className={cn('title')}>
          {props.item.title}
        </div>
      </div>
      <div className='Right-content'>
        <span className='Price-text'>{props.item.price} ₽</span>
        <div className={cn('actions')}>
          <button onClick={callbacks.onClick}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
}


export default React.memo(Item);
