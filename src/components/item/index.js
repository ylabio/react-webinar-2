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
        {props.index + 1}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <p className={cn('price')}>
        {`${props.item.price.toLocaleString('ru')} ₽`}
      </p>
      {
        props.item.count ? <p className={cn('amount')}>{props.item.count} шт</p> : null
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.onHandleBtn}>
          {props.item.count ? 'Удалить' : 'Добавить'}
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
