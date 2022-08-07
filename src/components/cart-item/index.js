import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem(props) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: useCallback(() => {
      props.onDelete(props.item.code)
    }, [props.onDelete, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>{props.item.price.toLocaleString('ru')} ₽</div>
      <div className={cn('amount')}>{props.item.amount} шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
}

CartItem.defaultProps = {
  onDelete: () => {},
}

export default React.memo(CartItem);
