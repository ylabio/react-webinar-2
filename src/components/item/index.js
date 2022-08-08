import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const itemsCost = props.item?.price * props.item?.amount
  const callbacks = {
    deleteItem: useCallback((e) => {
      e.stopPropagation();
      props.deleteLogic(props.item)
    }, [props.deleteLogic, props.item]),

    addItem: useCallback(() => {
      props.addLogic(props.item)
    }, [props.addLogic, props.item])

  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price_block')}>
        <span className={cn('price_block')}>{
          props.cardItem ?
            itemsCost.toLocaleString('ru-RU') :
            props.item.price.toLocaleString('ru-RU')} &#8381;
        </span>

        {props.cardItem ? <span className={cn('card_count')}>{props.item.amount} шт</span> : null}
      </div>
      <div className={cn('actions')}>
        {
          props.cardItem ? (
            <button onClick={callbacks.deleteItem}>
              Удалить
            </button>
          ) :
            (
              <button onClick={callbacks.addItem}>
                Добавить
              </button>
            )
        }
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  deleteLogic: propTypes.func.isRequired,
  addLogic: propTypes.func.isRequired
}

Item.defaultProps = {
  deleteLogic: () => { },
  addLogic: () => { }
}

export default React.memo(Item);
