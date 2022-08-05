import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function BasketItem(props) {
  const cn = bem('BasketItem');

  const callbacks = {
    onDelete: useCallback(() => {
      props.onDelete(props.item.code)
    }, [props.onDelete,  props.item])
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
        {props.item.price} ₽
      </div>
      <div className={cn('amount')}>
        {props.item.amount} шт
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions__button')} onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

BasketItem.propTypes = {
  number: propTypes.number.isRequired,
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func.isRequired
}

BasketItem.defaultProps = {
  onDeleted: () => {}
}

export default React.memo(BasketItem);