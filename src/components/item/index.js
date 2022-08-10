import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    btnHandle: useCallback((e) => {
      e.stopPropagation();
      props.btnHandle(props.item)
    }, [props.btnHandle,  props.item])
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
        {props.item.amount 
          ? 
          <div className={cn('amount')}>
            {props.item.amount} шт
          </div>
          : null}
      <div className={cn('actions')}>
        <button onClick={callbacks.btnHandle}>
          {props.btnText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  btnHandle: propTypes.func.isRequired,
  btnText: propTypes.string
}

Item.defaultProps = {
  btnHandle: () => {},
  btnText: "Добавить"
}

export default React.memo(Item);
