import React, {useCallback, useState} from 'react';
import propTypes, { number } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    addItem: useCallback(()=>{
      props.addItem(props.item)
    },[props.addItem, props.item]),
    deleteItem: useCallback(()=>{
      props.deleteItem(props.item)
    },[props.deleteItem, props.item])

  
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.number}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
       {new Intl.NumberFormat("ru").format(props.item.price)} &#8381;
      </div>
      {props.count ? <p className={cn('count')}>{props.count} шт</p> : ''}
      {props.addItem ?  
      <div className={cn('actions')}>
        <button onClick={callbacks.addItem}>
          Добавить
          </button>
      </div>
      : ''}
      {props.deleteItem ?
        <div className={cn('actions')}>
          <button onClick={callbacks.deleteItem}>
            Удалить
            </button>
        </div>
        : ''      
      }
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  number: propTypes.number.isRequired,
  count: propTypes.number.isRequired

}

Item.defaultProps = {
  item: {},
  number: 0,
  count: 0,
}

export default React.memo(Item);
