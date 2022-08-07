import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onItemAction: useCallback(() => {
      props.onItemAction(props.item.code);
    }, [props.item]),
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('info')}>
        <span className={cn('info-item')}>{props.item.price.toLocaleString('ru-RU') + " ₽"}</span>
        {props.item.count && <span className={cn('info-item')}>{props.item.count} шт</span>}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemAction}>
          {props.btnTxt}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onPushItemToCart: propTypes.func.isRequired,
  btnTxt:propTypes.string.isRequired
}

Item.defaultProps = {
  onPushItemToCart: () => {}
}

export default React.memo(Item);
