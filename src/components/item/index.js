import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onAddCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddCart(props.item.code)
    }, [props.onAddCart,  props.item]),

    onDeleteCart: useCallback((e) => {
      e.stopPropagation();
      props.onDeleteCart(props.item.code)
    }, [props.onDeleteCart,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        {props.item.price.toLocaleString('ru-RU') + ' ₽'}
      </div>
      {props.mode === 'cart' && <>
      <div className={cn('actions')}>
        {props.item.count} шт
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteCart}>
          Удалить
        </button>
      </div>
      </>}      
      {props.mode === 'default' && <div className={cn('actions')}>
        <button onClick={callbacks.onAddCart}>
          Добавить
        </button>
      </div>}
    </div>
  )
}

Item.propTypes = {
  mode: propTypes.oneOf(['default', 'cart']),
  item: propTypes.object.isRequired,
  onAddCart: propTypes.func.isRequired
}

Item.defaultProps = {
  mode: 'default',
  onAddCart: () => {},
}

export default React.memo(Item);
