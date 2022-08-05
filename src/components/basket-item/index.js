import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function BasketItem(props) {
  const cn = bem('BasketItem');

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
    }, [props.onDelete,  props.item])
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
        {props.item.price} ₽
      </div>
      <div className={cn('amount')}>
        {props.item.price} шт
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions__button')} onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

// Item.propTypes = {
//   item: propTypes.object.isRequired,
//   onDeleted: propTypes.func.isRequired
// }

// Item.defaultProps = {
//   onDeleted: () => {}
// }

export default React.memo(BasketItem);