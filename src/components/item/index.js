import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onHandleBtn: useCallback((e) => {
      e.stopPropagation();
      props.onHandleBtn(props.item.code)
    }, [props.onHandleBtn,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <p className={cn('price')}>
        {`${props.item.price.toLocaleString('ru')} ₽`}
      </p>
      <div className={cn('actions')}>
        <button onClick={callbacks.onHandleBtn}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onHandleBtn: propTypes.func.isRequired,
  
}

Item.defaultProps = {
  onHandleBtn: () => {}
}

export default React.memo(Item);
