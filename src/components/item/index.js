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

    onDeleteFromCart: useCallback(() => {
      props.onDeleteFromCart(props.item.code)
    }, [props.onDelete,  props.item]),

    onAddToCart: useCallback(() => {
      props.onAddToCart(props.item);
    },[])
  };
  
  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.number || props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString()} ₽
      </div>

      {props.item.count &&
      <div className={cn('stats')}>{props.item.count} штук</div> }
      
      {props.onDeleteFromCart &&
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteFromCart}>
          Удалить
        </button>
      </div>}

      {props.onAddToCart &&
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>}
      
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
}

Item.defaultProps = {
}

export default React.memo(Item);
