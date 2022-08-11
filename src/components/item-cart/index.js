import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('ItemCart');

  const callbacks = {
    onDelete: useCallback(() => {
      props.onDelete(props.item.code, props.item.price, props.item.quantity)
    }, [props.onDelete,  props.item]),
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
        {`${props.item.price.toLocaleString()} ₽`}
      </div>
      <div className={cn('quantity')}>
        {`${props.item.quantity} шт`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired
}

ItemCart.defaultProps = {
  item: {},
  onDelete: () => {}
}

export default React.memo(ItemCart);
