import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {

    onItemDeleteFromCart:useCallback (() => {
      props.onItemDeleteFromCart(props.item.code)
   },[]),

    onAddItemToCard: useCallback(() => {
      props.onAddItemToCard(props.item.code)
    }, [])
  };

  return (
    <>
      {
        props.cart
          ?
          <div className={cn('cartContainer')}>
            <div className={cn('numTitle')}>
              <div className={cn('number')}>
                {props.item.code}
              </div>
              <div className={cn('title')}>
                {props.item.title}
              </div>
            </div>
            <div className={cn('priceCount')}>
              <div className={cn('price')}>
                {props.item.price} ₽
              </div>
              <div className={cn('count')}>
                {props.item.count} шт
              </div>
              <button onClick={callbacks.onItemDeleteFromCart} >
                Удалить
              </button>
            </div>
          </div>
          :
          <div className={cn({ 'selected': props.item.selected })}>
            <div className={cn('number')}>
              {props.item.code}
            </div>
            <div className={cn('title')}>
              {props.item.title}
            </div>
            <div>
              {props.item.price}
            </div>
            <div className={cn('actions')}>
              <button onClick={callbacks.onAddItemToCard}>
                Добавить
              </button>
            </div>
          </div>
      }
    </>
  )
}

Item.propTypes = {
  cards: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDeleteFromCart: propTypes.func,
  onAddItemToCard: propTypes.func,
}

Item.defaultProps = {
  cards: [],
  onItemSelect: () => {},
  onItemDeleteFromCart: () => {}
}


export default React.memo(Item);
=======
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

    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
    }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
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
