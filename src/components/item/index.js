import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    addItemInBasket: useCallback(() => {
      props.addItemInBasket(props.item),[]
    })
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
        {`${props.item.price} ₽`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.addItemInBasket}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
  addItemInBasket: propTypes.func.isRequired,
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},
  addItemInBasket: () => {},
}

export default React.memo(Item);
